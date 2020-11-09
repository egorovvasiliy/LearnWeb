using System;
using System.Collections.Generic;
using System.Text;

namespace AutoZdRoutes.BLL.Model
{
    public class MapsBounder
    {
        public double sw_lat { get; set; }
        public double sw_lng { get; set; }
        public double ne_lat { get; set; }
        public double ne_lng { get; set; }
        public int type_id { get; set; }
    }
}
