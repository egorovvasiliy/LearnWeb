using System;
using System.Collections.Generic;
using System.Text;

namespace JWT.Auth.Model
{
    public class Person
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
