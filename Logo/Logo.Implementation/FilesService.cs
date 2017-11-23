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
using Logo.Contracts;

using ImageSharp;
using ImageSharp.Colors.Spaces;


using System.IO;
using ImageSharp;
using ImageSharp.Formats;
using ImageSharp.Processing;

namespace Logo.Implementation
{
    public class FilesService : IFilesService
    {
        
        public async Task<byte[]> SimpleDownloadAsync(string fileName)
        {
            var container = await GetContainerReference();
            var blockBlob = container.GetBlockBlobReference(fileName);

            var ms = new MemoryStream();

            await blockBlob.DownloadToStreamAsync(ms);

            return ms.ToArray();
        }

        public async Task SimpleUploadStreamAsync( LoadedFileBack loadedFileBack )
        {
            var container = await GetContainerReference();
            var blockBlob = container.GetBlockBlobReference( loadedFileBack.FileNameInBlob.ToString());

            await blockBlob.UploadFromStreamAsync(loadedFileBack.Stream);
        }


        public async Task<IEnumerable<byte[]>> DownloadFiles(IEnumerable<string> fileNames)
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

        public async Task UploadFiles(IEnumerable<LoadedFileBack> files)
        {
            var container = await GetContainerReference();
            var tasks = new List<Task>();
            foreach (var file in files)
            {
                var blockBlob = container.GetBlockBlobReference(file.FileNameInBlob.ToString());

                tasks.Add(Task.Run(async () =>
                {
                    //Stream fileStream = File.OpenRead(fileName);
                    await blockBlob.UploadFromStreamAsync(file.Stream);

                }));
            }

            await Task.WhenAll(tasks);
        }

        private  async Task<CloudBlobContainer> GetContainerReference()
        {
            var connectionString = "DefaultEndpointsProtocol=https;AccountName=logologo;AccountKey=/sGnF2wQzZ2aqbAMjscAZixiAf1cY4DNcunOrOl5z4VrSPBErTxBv1j8q0DpF+VRCzAPTAbhI1zVVRSm3Zu5tA==;EndpointSuffix=core.windows.net";
            var storageAccount = CloudStorageAccount.Parse(connectionString);
            var blobClient = storageAccount.CreateCloudBlobClient();
            var container = blobClient.GetContainerReference("container");

            await container.CreateIfNotExistsAsync();
            return container;
        }
    
        public byte []  ResizeImage(Stream input)
        {
            const int width = 306;
            const int height = 208;
            Configuration.Default.AddImageFormat(new JpegFormat());

            byte[] resizedImage = null;

            using (var output =  new MemoryStream())
            {
                var image = new Image(input)
                    .Resize(new ResizeOptions
                    {
                        Size = new Size(width, height),
                        Mode = ResizeMode.Max
                    });
                image.Save(output);

                resizedImage = output.ToArray();
            }
            return resizedImage;
        }
       
    }
}
