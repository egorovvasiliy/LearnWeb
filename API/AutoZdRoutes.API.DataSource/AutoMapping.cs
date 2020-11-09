using AutoMapper;
using AutoZdRoutes.BLL.Model;
using AutoZdRoutes.DAL.Model;

namespace AutoZdRoutes.API.DataSource
{
    public class AutoMapping : Profile
    {
        public AutoMapping() {
            CreateMap<ObjPoints, Stations>();
        }
    }
}
