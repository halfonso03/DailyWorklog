using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.TaskItems
{
    public class Create
    {
        public class Command : IRequest<Result<int>>
        {
            public TaskItem TaskItem { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<int>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            

            public async Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.TaskItems.Add(request.TaskItem);
                
                await _context.SaveChangesAsync();

                return Result<int>.Success(request.TaskItem.Id);
            }
        }
    }
}