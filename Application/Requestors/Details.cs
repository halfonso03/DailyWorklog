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
using Microsoft.EntityFrameworkCore.Query;
using Persistence;

namespace Application.Requestors
{
    public class Details
    {
        public class Query : IRequest<Result<Requestor>>
        {
            public int Id { get; set; }
        }

        public class Handler: IRequestHandler<Query, Result<Requestor>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Requestor>> Handle(Query request, CancellationToken cancellationToken)
            {
                var requestor = await _context.Requestors.SingleOrDefaultAsync(x => x.Id == request.Id);

                if (requestor == null)
                {
                    return Result<Requestor>.Failure("Invalid requestor");
                }

                return Result<Requestor>.Success(requestor);
            }
        }
    }
}