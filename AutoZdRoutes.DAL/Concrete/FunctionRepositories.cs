using AutoZdRoutes.DAL.Abstract;
using Microsoft.EntityFrameworkCore;
using AutoZdRoutes.DAL;
using AutoZdRoutes.DAL.Entities;
using AutoZdRoutes.DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoZdRoutes.DAL.Concrete
{
    public class FunctionRepositories: IFunctionRepositories
    {
        private SchedulingDbContext _shedDbContext;
        public FunctionRepositories(SchedulingDbContext shedDbContext) {
            _shedDbContext = shedDbContext;
        }
        public async Task<List<ObjPoints>> GetPointsForBoundesAsync(double sw_lat, double sw_lng, double ne_lat, double ne_lng, string type=null)
        {
            var result = _shedDbContext.Set<ObjPoints>().FromSqlRaw("select * from [dbo].[GetPointsForBoundes]({0},{1},{2},{3})", sw_lat, sw_lng, ne_lat, ne_lng);
            if (type==null)
                return await result.ToListAsync();
            else
                return await result.Where(st => st.Station_type == type).ToListAsync();
        }
    }
}
