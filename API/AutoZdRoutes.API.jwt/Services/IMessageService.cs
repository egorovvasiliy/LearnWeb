using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoZdRoutes.API.jwt.Services
{
    public interface IMessageService
    {
        Task Send(string email, string subject, string message);
    }
}
