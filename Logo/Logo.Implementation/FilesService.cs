using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Logo.Contracts.Services;
using Logo.Contracts;
using ImageSharp;
using ImageSharp.Formats;
using ImageSharp.Processing;
using System;
using System.IO.Compression;

namespace Logo.Implementation
{
    public class FilesService : IFilesService
    {

        //private readonly IFoldersService _foldersService;

        public FilesService()
        {
           // _foldersService = foldersService;
        }


        public async Task<byte[]> SimpleDownloadAsync(string fileName)
        {
            var container = await GetContainerReference();
            var blockBlob = container.GetBlockBlobReference(fileName);

            var ms = new MemoryStream();

            await blockBlob.DownloadToStreamAsync(ms);

            return ms.ToArray();
        }



        public async Task<Stream> SimpleDownloadStreamAsync(string fileName)
        {
            var container = await GetContainerReference();
            var blockBlob = container.GetBlockBlobReference(fileName);

            var ms = new MemoryStream();

            await blockBlob.DownloadToStreamAsync(ms);

            return ms;
        }




        public async Task SimpleUploadStreamAsync(LoadedFileBack loadedFileBack)
        {
            //loadedFileBack.Stream.Position = 0;
            var container = await GetContainerReference();
            var blockBlob = container.GetBlockBlobReference(loadedFileBack.FileNameInBlob.ToString());

            await blockBlob.UploadFromStreamAsync(loadedFileBack.Stream);
        }



        /*
        public  async Task <byte [] > GetArchive(List<string>  files)
         {

             var ms = new MemoryStream();


             foreach (var file in  files)
             {
                 ZipArchive zipArchive = new ZipArchive(ms, ZipArchiveMode.Create, true);



             }


         }
         */


        /*

            FileStream fZip = File.Create(compressedOutputFile);
            ZipOutputStream zipOStream = new ZipOutputStream(fZip);
    foreach (FileInfo fi in allfiles)
    {
        ZipEntry entry = new ZipEntry((fi.Name));
            zipOStream.PutNextEntry(entry);
        FileStream fs = File.OpenRead(fi.FullName);
        try
        {
            byte[] transferBuffer[1024];
            do
            {
                bytesRead = fs.Read(transferBuffer, 0, transferBuffer.Length);
                zipOStream.Write(transferBuffer, 0, bytesRead);
            }
            while (bytesRead > 0);
        }
        finally
        {
            fs.Close();
        }
    }
    zipOStream.Finish();
    zipOStream.Close();
*/
           
        public void CreateZipFile()
        {
            IEnumerable<string> files = new  List<string>
            {
                "1866009c-d93a-4e6e-8dab-396a52e12970",
                "f38c309a-cef8-4909-9a7a-9736cded1051"
            };


             // List<byte[]> list = DownloadFiles(files);
            using (MemoryStream ms = new MemoryStream())
            {
                using (ZipArchive archive = new ZipArchive(ms, ZipArchiveMode.Create))
                {
                    // Add the entry for each file
                    foreach (var file in files)
                    {
                        Stream loadedFile =  SimpleDownloadStreamAsync(file).GetAwaiter().GetResult();

                        ZipArchiveEntry fileEntry = archive.CreateEntry(file);
                        
                        using (var entryStream = fileEntry.Open())                        
                        using (var streamWriter = new StreamWriter(entryStream))
                        {
                            streamWriter.Write(fileEntry);
                        }                       
                    }

                    using (var fileStream = new FileStream(@"J:\test.zip", FileMode.Create))
                    {
                        ms.Seek(0, SeekOrigin.Begin);
                        ms.CopyTo(fileStream);
                       
                    }           
                }
            }
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



        private async Task<CloudBlobContainer> GetContainerReference()
        {
            var connectionString = "DefaultEndpointsProtocol=https;AccountName=logologo;AccountKey=/sGnF2wQzZ2aqbAMjscAZixiAf1cY4DNcunOrOl5z4VrSPBErTxBv1j8q0DpF+VRCzAPTAbhI1zVVRSm3Zu5tA==;EndpointSuffix=core.windows.net";
            var storageAccount = CloudStorageAccount.Parse(connectionString);
            var blobClient = storageAccount.CreateCloudBlobClient();
            var container = blobClient.GetContainerReference("container");

            await container.CreateIfNotExistsAsync();
            return container;
        }

        public byte[] ResizeImage(Stream input)
        {
            const int width = 306;
            const int height = 208;

            Configuration.Default.AddImageFormat(new JpegFormat());
            Configuration.Default.AddImageFormat(new PngFormat());

            byte[] resizedImage = null;

            using (var output = new MemoryStream())
            {
                var image = new Image(input)
                    .Resize(new ResizeOptions
                    {
                        Size = new Size(width, height),
                        Mode = ResizeMode.Crop,

                    });
                image.Save(output);

                resizedImage = output.ToArray();
            }
            return resizedImage;
        }

    }
}
