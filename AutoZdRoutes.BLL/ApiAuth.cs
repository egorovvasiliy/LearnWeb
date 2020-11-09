using AutoZdRoutes.BLL.Model;
using AutoZdRoutes.DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace AutoZdRoutes.BLL
{
    //#Solve:Пока вся логика в одном классе
    public static class ApiAuth
    {
        public static readonly string urlJWT = StaticFields.urlJWT;
        static HttpClient httpClient = StaticFields.httpClient;
        public static async Task<Response> LoginAsync([FromBody]LoginModel loginModel)
        {
            try
            {
                var hrm = await httpClient.PostAsync(urlJWT + "/api/account/login", new StringContent(JsonSerializer.Serialize(loginModel), Encoding.UTF8, "application/json"));
                var response =  JsonSerializer.Deserialize<Response>(await hrm.Content.ReadAsStringAsync());
                return response;
            }
            catch (Exception ex)
            {
                return new Response(System.Net.HttpStatusCode.BadRequest) { Message = ex.Message };
            }
        }
        [HttpPost]
        public static async Task<Response> RegisterAsync([FromBody]RegisterModel registerModel)
        {
            try
            {
                var hrm = await httpClient.PostAsync(urlJWT + "/api/account/register", new StringContent(JsonSerializer.Serialize(registerModel), Encoding.UTF8, "application/json"));
                return JsonSerializer.Deserialize<Response>(await hrm.Content.ReadAsStringAsync());
            }
            catch(Exception ex) {
                return new Response(System.Net.HttpStatusCode.BadRequest) { Message = ex.Message };
            }
        }
    }
}
