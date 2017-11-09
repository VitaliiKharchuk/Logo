using System;
using System.Collections.Generic;
using System.Text;

using System.Security.Cryptography;

namespace Logo.Contracts.Services
{
    public interface ICryptographyService
    {
        string RSAEncryptData(string originalString);
        //string RSADecryptData(string encryptedString);

    }
}
