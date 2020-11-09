using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoZdRoutes.BLL;
using AutoZdRoutes.BLL.Model;
using JWT.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace webPortal.Controllers
{
    public class AccountController : LayoutController
    {
        [HttpPost]
        public async Task<Response> Login([FromBody]LoginModel loginModel) {
            try
            {
                var response = await ApiAuth.LoginAsync(loginModel);
                var token = response.Message;
                if (response.Code==200) {
                    HttpContext.Response.Cookies.Append(AuthOptions.cookie_token, token);
                    HttpContext.Response.Cookies.Append(AuthOptions.cookie_username, loginModel.Email);
                    //Роль определяется дополнительным запросом см.ValidateToken
                }
                return response;// Прокидываем токен в ответе дальше клиенту
            }
            catch (Exception ex) {
                return new Response(HttpStatusCode.BadRequest)
                {
                    Message = ex.Message
                };
            }
        }
        [HttpPost]
        public async Task<Response> Register([FromBody]RegisterModel registerModel)
        {
            try
            {
                return await ApiAuth.RegisterAsync(registerModel);
            }
            catch (Exception ex)
            {
                return new Response(HttpStatusCode.BadRequest)
                {
                    Message = ex.Message
                };
            }
        }
        [HttpPost]
        public Response Logout()
        {
            HttpContext.Response.Cookies.Delete(AuthOptions.cookie_token);
            HttpContext.Response.Cookies.Delete(AuthOptions.cookie_username);
            HttpContext.Response.Cookies.Delete(AuthOptions.cookie_userrole);
            return new Response(HttpStatusCode.OK)
            {
                Message = "You have been successfully logged out"
            };
        }
        [HttpHead]
        public IActionResult ValidateToken()
        {
            try
            {
                if (HttpContext.User.Identity.IsAuthenticated)
                {
                    SetCookieRole();
                    return new OkResult();
                }
                else return new StatusCodeResult(204); //#Solve: возможно,так делать не стоит, перехват таких статусов в MiddleWare может хорошенько запутать
            }
            catch {
                return new StatusCodeResult(204);
            }
        }
        [NonAction]
        public void SetCookieRole()
        {
            var claimRole = HttpContext.User.Claims.Where(claim=>claim.Type== ClaimsIdentity.DefaultRoleClaimType).FirstOrDefault();
            if (claimRole!=null) {
                HttpContext.Response.Cookies.Append(AuthOptions.cookie_userrole, claimRole.Value);
            }
        }
        [HttpGet]
        public ViewResult ConfirmEmail(int success) => View(success);
        [HttpGet]
        public ViewResult SuccessRegister(string email) => View(email as Object);
    }
}
