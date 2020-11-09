using AutoZdRoutes.BLL.Model;
using AutoZdRoutes.DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace AutoZdRoutes.BLL
{
    //#Solve:Пока вся логика в одном классе
    public static class ApiDataSource
    {
        public static readonly string urlDS = StaticFields.urlDS;
        static HttpClient httpClient = StaticFields.httpClient;
        [HttpGet]
        public static async Task<IEnumerable<StationsType>> GetTypesStationAsync() {
            var hrm = await httpClient.GetAsync(urlDS + "/maps/TypesStation");
            return JsonSerializer.Deserialize<IEnumerable<StationsType>>(await hrm.Content.ReadAsStringAsync());
        }
        [HttpPost]
        public static async Task<IEnumerable<Stations>> GetStationsAsync([FromBody]MapsBounder mb) {
            var hrm = await httpClient.PostAsync(urlDS + "/maps/stations", new StringContent(JsonSerializer.Serialize(mb), Encoding.UTF8, "application/json"));
            return JsonSerializer.Deserialize<IEnumerable<Stations>>(await hrm.Content.ReadAsStringAsync());
        }
    }
}
