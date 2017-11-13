using System;
using System.Collections.Generic;
using System.Text;

using System.Collections.Concurrent;
using System.Threading;

using System.Threading.Tasks;
using System.IO;

using System.Linq;

using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.RetryPolicies;

namespace Logo.Implementation
{
    public  class FilesService
    {

        public static async Task SimpleUpload(byte[] file, string fileName)
        {
            CloudBlobContainer container = await GetContainerReference();
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(fileName);

            await blockBlob.UploadFromByteArrayAsync(file, 0, file.Length);
        }


        public static async Task UploadFileInBlocks(byte[] file, string fileName)
        {
            CloudBlobContainer cloudBlobContainer = await GetContainerReference();
            CloudBlockBlob blob = cloudBlobContainer.GetBlockBlobReference(fileName);

            // This is important to understand, that if the same file was already uploaded in ANY other way (e.g. like a single blob or by blocks but with other IDs
            // the upload will most definitely fail. This will happen because the block IDs that you associate with a blob must all be the same length.
            // So, if you have previously uploaded file as a one blob, Azure will assign is its own block IDs which will not be the same as yours and the upload will fail.
            await blob.DeleteIfExistsAsync();

            List<string> blockIDs = new List<string>();

            int blockSize = 5 * 1024 * 1024;
            long fileSize = file.Length;

            int fullSizeCount = (int)(fileSize / blockSize);
            int restSize = (int)(fileSize - fullSizeCount * blockSize);

            var blocksById = new Dictionary<int, byte[]>();

            Action<int, int> createBlocks = (currentBlockSize, partId) =>
            {
                byte[] bytesToUpload = new byte[currentBlockSize];
                Array.Copy(file, partId * blockSize, bytesToUpload, 0, bytesToUpload.Length);
                blocksById.Add(partId, bytesToUpload);
            };

            Parallel.For(0, fullSizeCount, partId =>
            {
                createBlocks(blockSize, partId);
            });

            createBlocks(restSize, fullSizeCount);

            var blockIds = new ConcurrentBag<string>();

            Parallel.ForEach(blocksById, blockById =>
            {
                string encoded = GetBase64BlockId(blockById.Key);
                blockIds.Add(encoded);
                using (MemoryStream memoryStream = new MemoryStream(blockById.Value, 0, blockById.Value.Length))
                {
                     blob.PutBlockAsync(encoded, memoryStream, null, null, 
                         new BlobRequestOptions
                    {
                        RetryPolicy = new ExponentialRetry(TimeSpan.FromSeconds(2), 1)
                    }, null);//todo!
                }
            });

            await blob.PutBlockListAsync(blockIds);
        }


        public static async Task< byte[]> DownloadFileInBlocks(string fileName)
        {
            CloudBlobContainer cloudBlobContainer = await GetContainerReference();
            CloudBlockBlob blob = cloudBlobContainer.GetBlockBlobReference(Path.GetFileName(fileName));

            int blockSize = 1024 * 1024; // 1 MB block size

            await blob.FetchAttributesAsync();
            long fileSize = blob.Properties.Length;

            var blobContents = new byte[fileSize];
            var fullSizeCount = (int)(fileSize / blockSize);
            var restSize = (int)(fileSize - fullSizeCount * blockSize);

            IEnumerable<int> parts = Enumerable.Range(0, fullSizeCount);
            int currentPart = -1;

            Parallel.ForEach(parts, async part =>
            {
                await blob.DownloadRangeToByteArrayAsync(blobContents, Interlocked.Add(ref currentPart, blockSize), currentPart, blockSize);
            });

            int finalIndexAndOffset = fullSizeCount + restSize;
            await blob.DownloadRangeToByteArrayAsync(blobContents, finalIndexAndOffset, finalIndexAndOffset, restSize);

            return blobContents;
        }



        private static string GetBase64BlockId(int blockId)
        {
            return Convert.ToBase64String(Encoding.ASCII.GetBytes(string.Format("{0}", blockId.ToString("0000000"))));
        }

        public static async Task<CloudBlobContainer> GetContainerReference()
        {
            string connectionString = "DefaultEndpointsProtocol=https;AccountName=vitalii;AccountKey=MlMH+2fNABUjeJBj6XDimg6x10YLeMeT/pHB+moaZtcSmrOVgjN+bQt6Mw1ycjwoOup6eneixZR1Vh9iVJIeYQ==;EndpointSuffix=core.windows.net";
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(connectionString);
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference("container");

            await container.CreateIfNotExistsAsync();

            return container;
        }

    }
}
