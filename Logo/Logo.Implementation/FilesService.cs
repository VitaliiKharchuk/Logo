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


using Logo.Contracts.Services;


namespace Logo.Implementation
{
    public  class FilesService : IFilesService
    {

        public  async Task SimpleUploadAsync(byte[] file, string fileName)
        {
            CloudBlobContainer container = await GetContainerReference();
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(fileName);

            blockBlob.UploadFromByteArrayAsync(file, 0, file.Length).Wait();
        }

        public static async Task<byte[]> SimpleDownloadAsync(string fileName)
        {
            CloudBlobContainer container = await GetContainerReference();
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(fileName);

            byte[] fileArr = new byte[10000000000];   // size  of   file  in   bytes
            blockBlob.DownloadToByteArrayAsync(fileArr, 0).Wait();

            return fileArr;
        }
       
        public  async Task<CloudBlobContainer> GetContainerReference()
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
