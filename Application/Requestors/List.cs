using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Azure.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Persistence;

namespace Application.Requestors
{
    public class List
    {
        public class Query : IRequest<Result<List<Requestor>>>
        {
            public int HidtaId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Requestor>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }


            public async Task<Result<List<Requestor>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Requestor>>.Success(await _context.Requestors.Where(x => x.HidtaId== request.HidtaId).ToListAsync());
            }
        }
    }
}