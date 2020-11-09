using AutoZdRoutes.BLL.ConvertersJSON;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace AutoZdRoutes.BLL.Model.ParsingApi.ScheduleOnStation
{
    public class SchedThread {
        public string uid { get; set; }
        public string title { get; set; }
        public string number { get; set; } //int не прокатило
        public string short_title { get; set; }
        public string transport_type { get; set; }
        public string vehicle { get; set; }
        public string express_type { get; set; }
    }
    public class Schedule
    {
        public string except_days { get; set; }
        public string arrival { get; set; }
        public SchedThread thread { get; set; }
        public bool is_fuzzy { get; set; }
        public string days { get; set; }
        public string stops { get; set; }
        public string departure { get; set; }
        public string terminal { get; set; }
        public string platform { get; set; }
    }
}
