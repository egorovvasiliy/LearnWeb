using AutoZdRoutes.API.jwt.Services;
using System;
using System.Collections;
using System.IO;
using System.Net.Http;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using KeyGenerator;

namespace TestConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            GenerateKeys.DownLoadToFileJson();
            Console.WriteLine("Завершить любым нажатием");
            Console.ReadKey();
        }
    }
}