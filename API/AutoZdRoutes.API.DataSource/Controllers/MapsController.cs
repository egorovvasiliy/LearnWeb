using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AutoZdRoutes.DAL;
using AutoZdRoutes.DAL.Model;
using AutoZdRoutes.DAL.Abstract;
using AutoZdRoutes.DAL.Concrete;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using Microsoft.AspNetCore.Cors;
using AutoZdRoutes.BLL.Model;
using AutoZdRoutes.DAL.Entities;

namespace AutoZdRoutes.API.DataSource.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MapsController : LayoutController
    {

        private readonly ILogger<MapsController> _logger;

        public MapsController(ILogger<MapsController>logger,SchedulingDbContext shedDbContext, IFunctionRepositories funcRepo, IMapper mapper) : base(shedDbContext, funcRepo, mapper)
        {
            _logger = logger;
        }
        [HttpPost("Stations")]
        public async Task<IEnumerable<Stations>> Post([FromBody] MapsBounder mb)
        {
            var objSt = await _funcRepo.GetPointsForBoundesAsync(mb.sw_lat, mb.sw_lng, mb.ne_lat, mb.ne_lng, null);//#Solve: Null временное решение...
            var result= _mapper.Map<IEnumerable<ObjPoints>,IEnumerable<Stations>>(objSt);
            return result.ToList();
        }
        [HttpGet("TypesStation")]
        public async Task<IEnumerable<StationsType>> TypesStation() {
            return await _shedDbContext.StationsType.OrderBy(t=> t.Description).ToListAsync();
        }
    }
}
