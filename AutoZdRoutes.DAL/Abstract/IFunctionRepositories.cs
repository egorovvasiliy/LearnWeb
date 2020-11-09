using AutoZdRoutes.DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoZdRoutes.DAL.Abstract
{
    //Интерфейс использую,потому что возможно придется воспользоваться встроенными функциями БД
    public interface IFunctionRepositories
    {
        Task<List<ObjPoints>> GetPointsForBoundesAsync(double sw_lat, double sw_lng, double ne_lat, double ne_lng, string type=null);
    }
}
