using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Logo.Contracts.Services
{
    public interface IFilesService
    {
        Task SimpleUploadAsync(byte[] file, string fileName);

        Task<byte[]> SimpleDownloadAsync(string fileName);
    }
}
