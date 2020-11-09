using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AutoZdRoutes.BLL.Model
{
    public class Response
    {
        [JsonPropertyName("code")]
        public int Code { get; set; }
        [JsonPropertyName("message")]
        public string Message { get; set; }
        [JsonPropertyName("errors")]
        public IEnumerable<Response> Errors { get; set; }
        public Response()//Требуется для JsonSerializer.Deserialize
        {
        }
        public Response(HttpStatusCode code)
        {
            Code = (int)code;
            Errors = new List<Response>();
        }
    }
}
