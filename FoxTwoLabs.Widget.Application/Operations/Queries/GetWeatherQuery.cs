using FoxTwoLabs.Widget.Application.Models;
using MediatR;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;



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
        private string _apiKey;
        private string _meto_endpoint;
        private string _google_maps_endpoint;

        public GetWeatherQueryHandler(IConfiguration configuration)
        {
            _apiKey = configuration.GetSection("GOOGLE_API_KEY").Value;
            _meto_endpoint = configuration.GetSection("METO_ENDPOINT").Value;
            _google_maps_endpoint = configuration.GetSection("GOOGLE_MAPS_ENDPOINT").Value;
        }


       public async Task<WeatherModel> Handle(GetWeatherQuery request, CancellationToken cancellationToken)
        {

            // Get Temperature based upon long,lat...
            string url = $"{_meto_endpoint}&latitude={request.req.Latitude}&longitude={request.req.Longitude}";
            var client = new HttpClient();
            var rawData = await client.GetStringAsync(url);
            dynamic jsonObj = JsonConvert.DeserializeObject<dynamic>(rawData);
            var temp = jsonObj.current_weather.temperature;

            // get city
            url = $"{_google_maps_endpoint}latlng={request.req.Latitude},{request.req.Longitude}&key={_apiKey}";
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
