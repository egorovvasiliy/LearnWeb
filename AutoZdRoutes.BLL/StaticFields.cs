using AutoZdRoutes.BLL.Model;
using AutoZdRoutes.DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace AutoZdRoutes.BLL
{
    public static class StaticFields
    {
        public static string patchSolution = Directory.GetParent(Directory.GetCurrentDirectory()).FullName;
        public static string jsonPath = $@"{patchSolution}\bd100.json";
        public static readonly string urlWeb = "https://localhost:44330";
        public static readonly string urlDS = "https://localhost:44331";
        public static readonly string urlJWT = "https://localhost:44332";
        public static string urlYandex = "https://api.rasp.yandex.net/v3.0";
        public static string apiKey = "f1db2e52-57a6-4d2e-b4ef-ead8a6de8989";
        public static HttpClient httpClient = new HttpClient();
    }
}
