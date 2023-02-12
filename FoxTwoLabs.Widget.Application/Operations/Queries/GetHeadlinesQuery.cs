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
using System.Text.Json.Nodes;
using System.Threading;
using System.Threading.Tasks;
using static Azure.Core.HttpHeader;
using static System.Net.WebRequestMethods;

namespace FoxTwoLabs.Widget.Application.Workflows.Queries
{

    public class GetHeadlinesQuery : IRequest<List<HeadlineModel>>
    {
              

        public GetHeadlinesQuery()
        {
      
        }

    }

    // Query Handler
    public class GetHeadlinesQueryHandler : IRequestHandler<GetHeadlinesQuery, List<HeadlineModel>>
    {
        private readonly IMapper _mapper;
        private string apiKey;

        public GetHeadlinesQueryHandler(IMapper mapper,  IConfiguration configuration)
        {
            _mapper = mapper;
            apiKey = configuration.GetSection("GNEWS_API_KEY").Value;
        }


       public async Task<List<HeadlineModel>> Handle(GetHeadlinesQuery request, CancellationToken cancellationToken)
        {
            // Note these endpoints typically would go into appsettings, all api keys would be in LaunchSettings/Secret manager
            List<HeadlineModel> News = new List<HeadlineModel>();


            var client = new HttpClient();
            string url = $" https://gnews.io/api/v4/top-headlines?category=general&apikey={apiKey}&lang=en";
            //var rawData = await client.GetStringAsync(url);

            // use this for testing...
             var rawData = "{\r\n  \"totalArticles\": 1286228,\r\n  \"articles\": [\r\n    {\r\n      \"title\": \"Nurses set to withdraw from A&E and intensive care units as strike intensifies\",\r\n      \"description\": \"UK’s biggest nursing union prompts alarm among senior officials by calling on intensive care workers to join walkouts\",\r\n      \"content\": \"The UK’s biggest nursing union is preparing an escalation of its pay dispute with the government that will see members working in emergency departments, intensive care units and cancer care services being asked to join the next round of strikes.\\nThe ... [4408 chars]\",\r\n      \"url\": \"https://www.theguardian.com/society/2023/feb/11/nurses-set-to-withdraw-from-ae-and-intensive-care-units-as-strike-intensifies\",\r\n      \"image\": \"https://i.guim.co.uk/img/media/d704df63463173620d263428bcc9ae82838228f9/0_99_3000_1800/master/3000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdG8tZGVmYXVsdC5wbmc&enable=upscale&s=585bc0645126fc3ff46ad1aba6c89d68\",\r\n      \"publishedAt\": \"2023-02-11T20:06:00Z\",\r\n      \"source\": {\r\n        \"name\": \"The Guardian\",\r\n        \"url\": \"https://www.theguardian.com\"\r\n      }\r\n    },\r\n    \r\n  ]\r\n}";

            JObject obj = Newtonsoft.Json.JsonConvert.DeserializeObject<JObject>(rawData);
            var articles = obj["articles"];
            foreach (var result in articles)
            {
                var article = new HeadlineModel
                {
                    Title = (string)result["title"],
                    Summary = (string)result["description"],
                    Content = (string)result["content"],
                    DatePublished = (string)result["publishedAt"],
                    Link = (string)result["url"],
                    Image = (string)result["image"],

                };

                News.Add(article);
            }
            return News;
        }
        
    }



}
