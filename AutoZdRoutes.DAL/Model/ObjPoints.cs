using System;
using System.Collections.Generic;

namespace AutoZdRoutes.DAL.Model
{
    public class ObjPoints
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Type_id { get; set; }
        public string Station_type { get; set; }
        public Decimal? Latitude { get; set; }
        public Decimal? Longitude { get; set; }
        public string Transport_type { get; set; }
        public string Yandex_code { get; set; }
    }
}
