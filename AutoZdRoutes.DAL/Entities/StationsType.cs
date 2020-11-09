using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AutoZdRoutes.DAL.Entities
{
    public partial class StationsType
    {
        public StationsType()
        {
            PointsInfo = new HashSet<PointsInfo>();
        }
        [JsonPropertyName("type_id")]
        public int TypeId { get; set; }
        [JsonPropertyName("type_name")]
        public string TypeName { get; set; }
        [JsonPropertyName("description")]
        public string Description { get; set; }
        [JsonIgnore]
        public ICollection<PointsInfo> PointsInfo { get; set; }
    }
}
