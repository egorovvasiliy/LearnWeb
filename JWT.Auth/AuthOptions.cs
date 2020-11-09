using AutoZdRoutes.BLL;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Security.Cryptography;
using System.Text;

namespace JWT.Auth
{
    public static class AuthOptions
    {
        const string symKEY = "abvgde12345abvgde12345abvgde12345"; //короткая длина этой константы вызывает ошибку при шифрации токена: "PII is hidden"
        const string PublicKeyString = "MIIBCgKCAQEAsGiFieRXshMWhB3/I0oe8S4QfxE/FPFNFd3pIn2EGv24FAVxGu9cXgxn/Xc/n9eKQU9YzXUTNV43LN\u002B49C48k0d1p7UjaLDVP0C4rElPEdRb3NmstAk2kct\u002BEaL8vjZcZQGZGZENY3bcbP2jACkAVmrfi2ps8aiQf2HaediG2/l7Qldr4mlWXl6Q6CQiq1Aj0q2QlqL9e0JFzMjmdnwi4sLQST8wDtpHBy82an6MyvOoKTP4O\u002BLhpxeYFlo0PN5qbP7SIpXMZ61bbis84nLpY8d38fBgth8KMylhcWtfh0ef7UKXnbSc1sDSnzQPSv5e1oNLGvkwqWR0jI5DLUQlqQIDAQAB";
        const string PrivateKeyString = "MIIEpAIBAAKCAQEAsGiFieRXshMWhB3/I0oe8S4QfxE/FPFNFd3pIn2EGv24FAVxGu9cXgxn/Xc/n9eKQU9YzXUTNV43LN\u002B49C48k0d1p7UjaLDVP0C4rElPEdRb3NmstAk2kct\u002BEaL8vjZcZQGZGZENY3bcbP2jACkAVmrfi2ps8aiQf2HaediG2/l7Qldr4mlWXl6Q6CQiq1Aj0q2QlqL9e0JFzMjmdnwi4sLQST8wDtpHBy82an6MyvOoKTP4O\u002BLhpxeYFlo0PN5qbP7SIpXMZ61bbis84nLpY8d38fBgth8KMylhcWtfh0ef7UKXnbSc1sDSnzQPSv5e1oNLGvkwqWR0jI5DLUQlqQIDAQABAoIBAQCPzEO\u002BiYHqyKB8Ba\u002BqZosecjxEOBzBx4jcoE2gLcx37AYXW/A80ozqpRZHiOM2Oo6aekGbCSolQK2dSKkNcnsyWvfPQ1qfxjWuH\u002BXpmsB3ejF/r3iWMURoSAZ1/fQkYU\u002Bjjk/shU7ymztHJOGwCbwatXePv6sauhs/mtZqqFQWDsbpE89uwkhfTwiiuiGv7oAyIFheYorEFUo4v049rlQwHXsODnLSguss/eGBj3cSZMTQNsQDF0eATfVwuXJ7GZ85zZyXb3NeFD2JA1j2ra5WJ/wae3woqrLXlSud0uhSp03otnFjxa07C0qprydc0sTrgF9lbnH2HsBKkPHwjQ85AoGBAMv2NNRlVbAjkyXt/roGXjxFylsHIU5JzN4cm5LNm9NO2ydtWsMD/5rS1isTxxLTv9o/NHjEa7OUh4CoiU6In51qn3f0RFGitun/CF1DHmLNDLiUt8bhVJ3TAT\u002B5/sKD8sLms43unrYibc1BSAV76JQMzmbOmIYoNDChnIbBqrzjAoGBAN1qqCwJ9E3UBJZMWsVXUptrzP2xCW/oF6IQhydMxUZbEq\u002B7onu9YLn8nvoSKD/FmJM0\u002BejJYksfshPtcVkTD1uuMQy8lX5sVMMB\u002BC\u002BrGxzAslJmkUntmYmRPJj3XdzdOh8DB7XXa3aCheKP/XUGpyUz5FGsMynugrSZ1BIm9oUDAoGABfW0x3wKi/IOK66PoenruQElD5HexEXdyaO2XAzL/9mvB7DnVQl535FHlsymJYOweHUeWGUM7JtrdjP2hyfw2g2yiTPHB0ek5qOAIBGFAsgRFheqYxJUgaQXxj/uFMr8Pfu1xXDyjEnnQXcl3psnSaQyJ8jjpg/orn8absmb7pcCgYEAmmCJDNuL6M/QuvJVv44Y3KCW9rL\u002B/3V1NNwNP8t5KIrLRpeuvFPYIxUNyxHp2jztGoYvUK1IyVQ6F0bQZuixJp0XOegq21Cw8J5o6uOELdH1AxrcZg0xpgcLlyOx4BKnOYQlVhXyqVhr/QGkGHohBAFgScmkirHvk/hFMrrT2v0CgYBzCa9xe8t6C1o9l/3H9SgXgUsw/CnLDj9rHh4dE5b6yPHo6JlGb0WNIIMtzrvgdBri0k6CK5pl9xA\u002BZM/lBY3kVSuAUilVNdIDE\u002BxLY5N7XIVtqW7QXCu3S0/Q/iLwwmAXU/aODK5b0VxSKq7NXK4R2znOXu2\u002BWLNQ3pvb5I/1zQ==";
        public const int LIFETIME = 1000000;
        //----------------------------------------------
        public static readonly string cookie_token= "access_token";
        public static readonly string cookie_username = "username";
        public static readonly string cookie_userrole = "userrole";
        public static readonly string Issuer = StaticFields.urlJWT;
        public static readonly string Audience = StaticFields.urlWeb;
        public static readonly SecurityKey PublicKey = GetPublicKey();
        public static readonly SecurityKey PrivateKey = GetPrivateKey();
        static SecurityKey GetPublicKey() {
            var key = RSA.Create();
            key.ImportRSAPublicKey(source: Convert.FromBase64String(PublicKeyString),bytesRead: out var _);
            return new RsaSecurityKey(key);
        }
        static SecurityKey GetPrivateKey()
        {
            var key = RSA.Create();
            key.ImportRSAPrivateKey(source: Convert.FromBase64String(PrivateKeyString), bytesRead: out var _);
            return new RsaSecurityKey(key);
        }
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(symKEY));
        }
    }
}
