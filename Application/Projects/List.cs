using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Azure.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects
{
    public class List
    {
        public class Query :IRequest<List<Project>>
        {

        }

        public class Handler : IRequestHandler<Query, List<Project>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }


            public async Task<List<Project>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Projects.ToListAsync();   
            }
        }
    }
}