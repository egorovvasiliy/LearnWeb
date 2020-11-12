using JWT.Auth;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace AutoZdRoutes.WEB.Services
{
    namespace AutoZdRoutes.WEB.Services
    {
        public class TokenMiddleware
        {
            private readonly RequestDelegate _next;

            public TokenMiddleware(RequestDelegate next)
            {
                this._next = next;
            }
            public async Task InvokeAsync(HttpContext context)
            {
                var tokenFromCookie = context.Request.Cookies[AuthOptions.cookie_token];
                if (!string.IsNullOrEmpty(tokenFromCookie))
                    context.Request.Headers.Add("Authorization", "Bearer " + tokenFromCookie);
                await _next.Invoke(context);
                if (string.IsNullOrEmpty(context.Request.Cookies[AuthOptions.cookie_username]) && context.User.Identity.IsAuthenticated) //когда на клиенте нарочно убрали cookie
                    context.Response.Cookies.Append(AuthOptions.cookie_username, context.User.Identity.Name);
            }
        }
    }
}
