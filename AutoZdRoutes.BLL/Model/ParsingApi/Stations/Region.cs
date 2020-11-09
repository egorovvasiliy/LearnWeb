using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace AutoZdRoutes.BLL.Model.ParsingApi.Stations
{
    class Region: Locality
    {
        [JsonPropertyName("settlements")]
        public Settlement[] children { get; set; }
        public override Locality[] Childs => children;
        public override LocalityType type => LocalityType.Region;
    }
}
