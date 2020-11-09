using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace AutoZdRoutes.BLL.Model.ParsingApi.Stations
{
    class Countries: Locality
    {
        [JsonPropertyName("countries")]
        public Countrie[] children { get; set; }
        public override Locality[] Childs => children;
        public override LocalityType type => LocalityType.World;
    }
    class Countrie : Locality
    {
        [JsonPropertyName("regions")]
        public Region[] children { get; set; }
        public override Locality[] Childs => children;
        public override LocalityType type => LocalityType.Countrie;
    }
}
