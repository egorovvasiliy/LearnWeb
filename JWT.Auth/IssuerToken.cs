using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JWT.Auth
{
    public static class IssuerToken
    {
        public static string Get(IEnumerable<Claim> claims) {
            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                                issuer: AuthOptions.Issuer,
                                audience: AuthOptions.Audience,
                                notBefore: now,
                                claims: claims,
                                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                                signingCredentials: new SigningCredentials(AuthOptions.PrivateKey, SecurityAlgorithms.RsaSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            return encodedJwt;
        }
    }
}
