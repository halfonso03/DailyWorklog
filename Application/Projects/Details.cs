using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Projects
{
    public class Details : IRequest<Project>
    {
        public class Query : IRequest<Project>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Project>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Project> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Projects.FindAsync(request.Id);
            }
        }
    }
}