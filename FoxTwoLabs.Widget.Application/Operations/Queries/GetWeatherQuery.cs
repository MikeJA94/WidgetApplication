using AutoMapper;
using FoxTwoLabs.Widget.Application.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using static Azure.Core.HttpHeader;
using static System.Net.WebRequestMethods;

namespace FoxTwoLabs.Widget.Application.Workflows.Queries
{

    public class GetWeatherQuery : IRequest<WeatherModel>
    {
        public WeatherModelRequest req;
        

        public GetWeatherQuery(WeatherModelRequest request)
        {
            req = request;
        }

    }

    // Query Handler
    public class GetWeatherQueryHandler : IRequestHandler<GetWeatherQuery, WeatherModel>
    {
        private readonly IMapper _mapper;
        private string apiKey;

        public GetWeatherQueryHandler(IMapper mapper, IConfiguration configuration)
        {
            _mapper = mapper;
            apiKey = configuration.GetSection("GOOGLE_API_KEY").Value;
        }


       public async Task<WeatherModel> Handle(GetWeatherQuery request, CancellationToken cancellationToken)
        {

            // Note these endpoints typically would go into appsettings, all api keys would be in LaunchSettings/Secret manager

            // Get Temperature based upon long,lat...
            string url = $"https://api.open-meteo.com/v1/forecast?latitude={request.req.Latitude}&longitude={request.req.Longitude}&current_weather=true";
            var client = new HttpClient();
            var rawData = await client.GetStringAsync(url);
            dynamic jsonObj = JsonConvert.DeserializeObject<dynamic>(rawData);
            var temp = jsonObj.current_weather.temperature;

            // get city
            url = $"https://maps.googleapis.com/maps/api/geocode/json?latlng={request.req.Latitude},{request.req.Longitude}&key={apiKey}";
            rawData = await client.GetStringAsync(url);

            // For demo, we just know where the pretty address is :)
            jsonObj = JsonConvert.DeserializeObject<dynamic>(rawData);
            var location = jsonObj.results[5].formatted_address;
            
            WeatherModel data = new WeatherModel
            {
                Location = location,
                // °F = (°C × 9 / 5) +32
                Temperature = $"{(temp * 9 / 5) + 32} (F)"  // In Fahrenheit
            };
             return data;
        }
        
    }



}
