using AutoZdRoutes.BLL.ConvertersJSON;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace AutoZdRoutes.BLL.Model.ParsingApi.ScheduleOnStation
{ 
    public class Station
    {
        public string code { get; set; }
        public string title { get; set; }
        public string station_type { get; set; }
        public string popular_title { get; set; }
        public string short_title { get; set; }
        public string transport_type { get; set; }
        public string type { get; set; }
    }
}
