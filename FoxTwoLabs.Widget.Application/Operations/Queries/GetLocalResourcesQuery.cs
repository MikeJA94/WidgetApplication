using AutoMapper;
using FoxTwoLabs.Widget.Application.Models;
using FoxTwoLabs.Widget.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using static Azure.Core.HttpHeader;
using static System.Net.WebRequestMethods;

namespace FoxTwoLabs.Widget.Application.Workflows.Queries
{

    public class GetLocalResourcesQuery : IRequest<List<LocalResourceModel>>
    {
        public string searchKey { get; set; }

        public GetLocalResourcesQuery(string searchKey)
        {
            this.searchKey = searchKey;
        }

    }

    // Query Handler
    public class GetLocalResourcesQueryHandler : IRequestHandler<GetLocalResourcesQuery, List<LocalResourceModel>>
    {
        private readonly IMapper _mapper;

        public GetLocalResourcesQueryHandler(IMapper mapper)
        {
            _mapper = mapper;
        }


       public async Task<List<LocalResourceModel>> Handle(GetLocalResourcesQuery request, CancellationToken cancellationToken)
        {
            List<LocalResourceModel> News = new List<LocalResourceModel>();
            Random random = new Random();

            // make sure key is valid
            if ( string.IsNullOrEmpty(request.searchKey)) {
                return News;
            }

            // mock/seed files and apps data
            // Real life we could do a directory info search using System.IO namespace.
            string[] extTypes = { ".pdf", ".docx", ".txt", ".png" };
            
            for (var cnt = 0; cnt < 25; cnt++) {
                var size = random.Next(10, 250); // randomize the size of files
                var typeVal = random.Next(0,100); // randomize the type of resourse
                var extVal = random.Next(0, 3); // randomize the type of file
                var isApp = typeVal < 50;  // just to get a distribution
                var ext = extTypes[extVal];


                var item = new LocalResourceModel
                {
                    Name =  (isApp) ? $"Application {cnt}": $"File {cnt}{ext}",
                    Size = $"{size}kb",
                    Type = (isApp)? RESOURCE_TYPE.App : RESOURCE_TYPE.File,
            };

                News.Add(item);
            }

            // now apply a basic search criteria based upon name of resource
            News = News.FindAll(x => (x.Name.ToLower().Contains(request.searchKey.ToLower())) || (request.searchKey == "*"));
            return News;
        }
        
    }



}
