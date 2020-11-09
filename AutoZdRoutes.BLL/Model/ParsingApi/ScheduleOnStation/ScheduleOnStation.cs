using AutoZdRoutes.BLL.ConvertersJSON;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace AutoZdRoutes.BLL.Model.ParsingApi.ScheduleOnStation
{
    public class ScheduleOnStation
    {
        public string date { get; set; }
        public Pagination padination { get; set; }
        public Station station { get; set; }
        public Schedule[] schedule { get; set; }
        public Code schedule_direction { get; set; }
        public Code[] directions { get; set; }
    }
}
