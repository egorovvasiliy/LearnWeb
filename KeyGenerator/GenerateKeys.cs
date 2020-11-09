using System;
using System.IO;
using System.Reflection;
using System.Security.Cryptography;
using System.Text.Json;

namespace KeyGenerator
{
    public static class GenerateKeys
    {
        public static void DownLoadToFileJson() {
            using var rsa = RSA.Create();  //Создаем ключ шифрования
            var privateKey = Convert.ToBase64String(rsa.ExportRSAPrivateKey());//получение приватного ключа
            var publiceKey = Convert.ToBase64String(rsa.ExportRSAPublicKey());//получение публичного ключа
            var json = JsonSerializer.Serialize(new
            {
                PublicKey = publiceKey,
                PrivateKey = privateKey
            }, new JsonSerializerOptions { WriteIndented = true });
            var location = Assembly.GetExecutingAssembly().Location;
            var pathProject=Directory.GetParent(location).Parent.Parent.Parent.Parent.FullName;
            var pathFile = Path.Combine(pathProject, "rsaKey.json");
            File.WriteAllText(pathFile, json);
        }
    }
}
