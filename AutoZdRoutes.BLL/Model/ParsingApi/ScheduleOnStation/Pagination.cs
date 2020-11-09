using AutoZdRoutes.BLL.ConvertersJSON;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace AutoZdRoutes.BLL.Model.ParsingApi.ScheduleOnStation
{
    public class Pagination
    {
        public int total { get; set; }
        public int limit { get; set; }
        public int offset { get; set; }
    }
}
