using System;
using System.Collections.Generic;

namespace AutoZdRoutes.DAL.Entities
{
    public partial class PointsInfo
    {
        public int Id { get; set; }
        public int? Parent_Id { get; set; }
        public string YandexCode { get; set; }
        public string Title { get; set; }
        public int TypeId { get; set; }
        public int? Temp_Id { get; set; }
        public int? Temp_Parent_Id { get; set; }

        public StationsType Type { get; set; }
        //public Points Points { get; set; }
    }
}
