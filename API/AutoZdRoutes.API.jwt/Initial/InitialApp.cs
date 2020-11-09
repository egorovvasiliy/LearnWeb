using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoZdRoutes.API.jwt.Initial
{
    public class InitialApp
    {
        /// <summary>
        /// Метод актуален когда в БД отсутсвуют роли. Следуюшие роли добавятся через сервис roleManager. P.s. добавить "руками"(напрямую в MSSqlMS) в БД не удалось
        /// </summary>
        /// <param name="roleManag"></param>
        public static void SetDefaultIdentityEntities(RoleManager<IdentityRole> roleManag,UserManager<IdentityUser> userManag) {
            //---------------------------
            var roles = new List<string>() { "admin", "user", "guest" };
            roles.ForEach(role => {
                if (!roleManag.RoleExistsAsync(role).Result)                      //#Solve: выяснить:можно ли асинхронно (см.Startup...Configure)
                    roleManag.CreateAsync(new IdentityRole(role)).Wait();
            });
            //---------------------------
            var dictionaryUsers = new Dictionary<string,string>(){  //пары Email,Role
                {"admin@ru", "admin" },
                {"user@ru", "user" } };
            foreach (var item in dictionaryUsers) {
                var email = item.Key;
                var role = item.Value;
                if (userManag.FindByEmailAsync(email).Result == null)
                {
                    var newUser = new IdentityUser
                    {
                        UserName = email,
                        Email = email
                    };
                    IdentityResult userCreationResult = null;
                    userCreationResult = userManag.CreateAsync(newUser, "123456").Result;
                    var emailToken = userManag.GenerateEmailConfirmationTokenAsync(newUser).Result;
                    userManag.ConfirmEmailAsync(newUser, emailToken).Wait();
                    userManag.AddToRoleAsync(newUser, role).Wait();
                }
            }
        }
    }
}
