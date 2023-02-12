using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FoxTwoLabs.Widget.Application.Models;
using FoxTwoLabs.Widget.Application.Workflows.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MyWebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WidgetController : ControllerBase
    {

        private readonly IMediator _mediator;
        private readonly ILogger<WidgetController> _logger;

        public WidgetController(IMediator mediator, ILogger<WidgetController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet("weather")]
        [ProducesResponseType(typeof(WeatherModel), 200)]
        public async  Task<IActionResult> Get([FromQuery]  string latitude, [FromQuery] string longitude)
        {
            WeatherModelRequest req = new WeatherModelRequest
            {
                Latitude = latitude,
                Longitude = longitude
            };
            var result = await _mediator.Send(new GetWeatherQuery(req));

            return Ok(result);
        }

        [HttpGet("headlines")]
        [ProducesResponseType(typeof(List<HeadlineModel>), 200)]
        public async Task<IActionResult> Get()
        {
            var result = await _mediator.Send(new GetHeadlinesQuery());

            return Ok(result);
        }

        [HttpGet("localresources")]
        [ProducesResponseType(typeof(List<LocalResourceModel>), 200)]
        public async Task<IActionResult> Get(string searchKey)
        {
            var result = await _mediator.Send(new GetLocalResourcesQuery(searchKey));

            return Ok(result);
        }


    }
}
