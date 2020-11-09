using System;
using System.Collections.Generic;
using System.Text;

namespace AutoZdRoutes.BLL.Model
{
    public class Stations
    {
        public int id { get; set; }
        public string title { get; set; }
        public int type_id { get; set; }
        public string station_type { get; set; }
        public Decimal? latitude { get; set; }
        public Decimal? longitude { get; set; }
        public string transport_type { get; set; }
        public string yandex_code { get; set; }
    }
}
