using System;
using System.Collections.Generic;

namespace AutoZdRoutes.DAL.Entities
{
    public partial class Points
    {
        public int Id { get; set; }
        public string Direction { get; set; }
        public string StationType { get; set; }
        public string TransportType { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public string Esr_code { get; set; }
        //public ObjInfo IdNavigation { get; set; }
    }
}
