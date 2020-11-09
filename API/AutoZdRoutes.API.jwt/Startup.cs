using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoZdRoutes.API.jwt.Data;
using AutoZdRoutes.API.jwt.Filters;
using AutoZdRoutes.API.jwt.Initial;
using AutoZdRoutes.API.jwt.Services;
using JWT.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace AutoZdRoutes.API.jwt
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            Env = env;
        }

        public IConfiguration Configuration { get; }
        IWebHostEnvironment Env;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection")));
            //optionsBuilder => optionsBuilder.MigrationsAssembly("WebApiIdentityTokenAuth")));
            services.AddIdentity<IdentityUser, IdentityRole>(opts =>
            {
                opts.SignIn.RequireConfirmedAccount = true;
                opts.Password.RequiredLength = 6;
                opts.Password.RequireNonAlphanumeric = false;
                opts.Password.RequireLowercase = false;
                opts.Password.RequireUppercase = false;
                opts.Password.RequireDigit = false;
            })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();
            services.AddTransient<IMessageService, EmailService>();
            if (Env.IsDevelopment()) // Просмотр ошибок в json-response
                services.AddControllers(options=> {
                    options.Filters.Add(new ExceptionFilter());
                });
            //services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, RoleManager<IdentityRole> rManag,UserManager<IdentityUser> uManag)
        {
            InitialApp.SetDefaultIdentityEntities(rManag,uManag);
            app.UseCors(builder => builder.WithOrigins("*").AllowAnyHeader().AllowAnyMethod());
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
