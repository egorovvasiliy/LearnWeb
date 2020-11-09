using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoZdRoutes.API.jwt.Services;
using AutoZdRoutes.BLL;
using AutoZdRoutes.BLL.Model;
using JWT.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace AutoZdRoutes.API.jwt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IMessageService _messageService;
        private static readonly string urlWeb = StaticFields.urlWeb;
        public AccountController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            RoleManager<IdentityRole>  roleManager,
            IMessageService messageService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _messageService = messageService;
            _roleManager = roleManager;
        }
        [HttpPost]
        [Route("register")]
        public async Task<Response> Register([FromBody]RegisterModel registerModel)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(registerModel.Email) || string.IsNullOrWhiteSpace(registerModel.Password))
                {
                    return new Response(HttpStatusCode.BadRequest)
                    {
                        Message = "email or password is null"
                    };
                }
                //----------------------------------------------------------------------------------------------
                if (registerModel.Password != registerModel.ConfirmPassword)
                {
                    return new Response(HttpStatusCode.BadRequest)
                    {
                        Message = "Passwords don't match!"
                    };
                }
                //----------------------------------------------------------------------------------------------
                var newUser = new IdentityUser
                {
                    UserName = registerModel.Email,
                    Email = registerModel.Email
                };
                IdentityResult userCreationResult = null;
                userCreationResult = await _userManager.CreateAsync(newUser, registerModel.Password);
                if (!userCreationResult.Succeeded)
                {
                    return new Response(HttpStatusCode.BadRequest)
                    {
                        Message = "An error occurred when creating the user, see nested errors",
                        Errors = userCreationResult.Errors.Select(x => new Response(HttpStatusCode.BadRequest)
                        {
                            Message = $"[{x.Code}] {x.Description}"
                        })
                    };
                }
                //----------------------------------------------------------------------------------------------
                await _userManager.AddToRoleAsync(newUser, "user");//#Solve:
                //----------------------------------------------------------------------------------------------
                var emailConfirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
                var tokenVerificationUrl = Url.Action(
                    "VerifyEmail", "Account",
                    new
                    {
                        Id = newUser.Id,
                        token = emailConfirmationToken
                    },
                    Request.Scheme);

                await _messageService.Send(registerModel.Email, "Verify your email", $"Click <a href=\"{tokenVerificationUrl}\">here</a> to verify your email");
                //----------------------------------------------------------------------------------------------
                return new Response(HttpStatusCode.OK)
                {
                    Message = $"Registration completed, please verify your email - {registerModel.Email}"
                };
            }
            catch (Exception ex) {//#Solve: разобрать подробнее ошибки
                return new Response(HttpStatusCode.BadRequest)
                {
                    Message = ex.Message
                };
            }
        }
        public async Task<IActionResult> VerifyEmail(string id, string token)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                throw new InvalidOperationException();

            var emailConfirmationResult = await _userManager.ConfirmEmailAsync(user, token);
            var requestParam = emailConfirmationResult.Succeeded ? 1 : 0;
            return new RedirectResult($"{urlWeb}/Account/ConfirmEmail?success={requestParam}"); 
        }
        [HttpPost]
        [Route("login")]
        public async Task<Response> Login([FromBody]LoginModel loginModel)
        {
            try {
                if (string.IsNullOrWhiteSpace(loginModel.Email) || string.IsNullOrWhiteSpace(loginModel.Password))
                {
                    return new Response(HttpStatusCode.Unauthorized)
                    {
                        Message = "email or password is null"
                    };
                }
                var user = await _userManager.FindByEmailAsync(loginModel.Email);
                if (user == null)
                {
                    return new Response(HttpStatusCode.Unauthorized)
                    {
                        Message = "Invalid Login"
                    };
                }

                if (!user.EmailConfirmed)
                {
                    return new Response(HttpStatusCode.Unauthorized)
                    {
                        Message = "Email not confirmed, please check your email for confirmation link"
                    };
                }

                var passwordSignInResult = await _signInManager.PasswordSignInAsync(user, loginModel.Password, isPersistent: true, lockoutOnFailure: false);
                if (!passwordSignInResult.Succeeded)
                {
                    return new Response(HttpStatusCode.Unauthorized)
                    {
                        Message = "Invalid password"
                    };
                }
                //-------------------------------------------------------------------
                var userRoles = await _userManager.GetRolesAsync(user);
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType,userRoles[0]) //#Solve:
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                //-------------------------------------------------------------------
                var token = IssuerToken.Get(claims);
                return new Response(HttpStatusCode.OK)
                {
                    Message = token
                };
            }
            catch(Exception ex) {
                return new Response(HttpStatusCode.BadRequest)
                {
                    Message = "Ошибка на сервере авторизации:" + ex.Message
                };
            }
        }
        //#Solve: в настоящий момент это не актуально
        [HttpPost]
        [Route("logout")]
        public async Task<Response> Logout()
        {
            await _signInManager.SignOutAsync();

            return new Response(HttpStatusCode.OK)
            {
                Message = "You have been successfully logged out"
            };
        }
    }
}