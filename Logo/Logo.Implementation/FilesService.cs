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
    public  class FilesService //: IFilesService
    {

        public static async Task<byte[]> SimpleDownloadAsync(string fileName)
        {
            var container = await GetContainerReference();
            var blockBlob = container.GetBlockBlobReference(fileName);

            var ms = new MemoryStream();

            await blockBlob.DownloadToStreamAsync(ms);

            return ms.ToArray();
        }

        public static async Task SimpleUploadStreamAsync(FileStream file, string fileName)
        {
            var container = await GetContainerReference();
            var blockBlob = container.GetBlockBlobReference(fileName);

            await blockBlob.UploadFromStreamAsync(file);
        }


        public static async Task<IEnumerable<byte[]>> DownloadFiles(IEnumerable<string> fileNames)
        {
            var container = await GetContainerReference();
            var tasks = new List<Task<byte[]>>();
            foreach (var fileName in fileNames)
            {
                var blockBlob = container.GetBlockBlobReference(fileName);
                tasks.Add(Task.Run(async () =>
                {
                    var ms = new MemoryStream();
                    await blockBlob.DownloadToStreamAsync(ms);
                    return ms.ToArray();
                }));
            }
            return await Task.WhenAll(tasks);
        }

        public static async Task UploadFiles(IEnumerable<string> fileNames)
        {
            var container = await GetContainerReference();
            var tasks = new List<Task>();
            foreach (var fileName in fileNames)
            {
                var blockBlob = container.GetBlockBlobReference(Path.GetFileName(fileName));

                tasks.Add(Task.Run(async () =>
                {
                    Stream fileStream = File.OpenRead(fileName);
                    await blockBlob.UploadFromStreamAsync(fileStream);

                }));
            }

            await Task.WhenAll(tasks);
        }

        public static async Task<CloudBlobContainer> GetContainerReference()
        {
            var connectionString = "DefaultEndpointsProtocol=https;AccountName=logologo;AccountKey=/sGnF2wQzZ2aqbAMjscAZixiAf1cY4DNcunOrOl5z4VrSPBErTxBv1j8q0DpF+VRCzAPTAbhI1zVVRSm3Zu5tA==;EndpointSuffix=core.windows.net";
            var storageAccount = CloudStorageAccount.Parse(connectionString);
            var blobClient = storageAccount.CreateCloudBlobClient();
            var container = blobClient.GetContainerReference("container");

            await container.CreateIfNotExistsAsync();
            return container;
        }




    }
}
