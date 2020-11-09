using AutoZdRoutes.BLL.ConvertersJSON;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace AutoZdRoutes.BLL.Model.ParsingApi.Stations
{ 
    class Station:Locality
    {
        public string direction { get; set; }
        public string station_type { get; set; }
        public string transport_type { get; set; }
        [JsonConverter(typeof(StringToDouble))]
        public double longitude { get; set; }
        [JsonConverter(typeof(StringToDouble))]
        public double latitude { get; set; }
        public override LocalityType type => LocalityType.Station;
    }
}
