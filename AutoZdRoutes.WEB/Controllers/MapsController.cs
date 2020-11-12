using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;
using AutoZdRoutes.BLL;
using AutoZdRoutes.BLL.Model;
using AutoZdRoutes.BLL.Model.ParsingApi.ScheduleOnStation;
using AutoZdRoutes.WEB.Hubs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace webPortal.Controllers
{
    //[Authorize]
    public class MapsController : LayoutController
    {
        //public MapsController(IHubContext<NotifyHub, INotifyClient> hubContext) : base(hubContext) { 
        //}
        public IActionResult Index()
        {   
            return View();
        }
        public async Task<JsonResult> GetTypesStation() =>
            Json(await ApiDataSource.GetTypesStationAsync());
        [HttpGet]
        public async Task<ScheduleOnStation> GetScheduleOnStation(string idStation) {
            try {
                var stream = await ApiYandex.DownloadJsonStream("schedule", $"station={idStation}") as Stream;
                var result = await JsonSerializer.DeserializeAsync<ScheduleOnStation>(stream);
                return result;
            }
            catch (Exception ex) {
                throw ex;
            }
        }
        [HttpPost]
        public async Task<IEnumerable<Stations>> GetStations([FromBody] MapsBounder mb) {
            try
            {
                var stations = await ApiDataSource.GetStationsAsync(mb);
                return stations.Where(st => st.type_id == mb.type_id || mb.type_id == 0);//#Solve:временное решение...фильтрация будет в MSsql
            }
            catch (Exception ex) {
                throw ex;
            }
        }
        [HttpPost]
        public async Task LoadPointsToFile()
        {
            try
            {
                var jsonString = await ApiYandex.DownloadJsonString("stations_list", "lang = ru_RU & format = json") as string;
                await hubContext.Clients.All.SendMessage("NotifyDownLoad");
                await ApiYandex.WriteJsonToFile(jsonString, StaticFields.jsonPath);
                await hubContext.Clients.All.SendMessage("NotifyWriteJson");
            }
            catch (Exception ex) {
                var x = ex;
            }
        }
        public async Task LoadPointsToDBFromFile()
        {
            try
            {
                await ApiYandex.DownloadPointsToDBFromFile();
            }
            catch (Exception ex)
            {
                var x = ex;
            }
        }
    }
}
