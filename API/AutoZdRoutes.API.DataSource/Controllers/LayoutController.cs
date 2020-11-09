using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoZdRoutes.DAL;
using AutoZdRoutes.DAL.Abstract;
using AutoZdRoutes.DAL.Concrete;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AutoZdRoutes.API.DataSource.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public abstract class LayoutController : ControllerBase
    {
        protected readonly SchedulingDbContext _shedDbContext;
        protected readonly IFunctionRepositories _funcRepo;
        protected readonly IMapper _mapper;
        public LayoutController(SchedulingDbContext shedDbContext, IFunctionRepositories funcRepo, IMapper mapper)
        {
            _shedDbContext = shedDbContext;
            _funcRepo = funcRepo;
            _mapper = mapper;
        }
    }
}
