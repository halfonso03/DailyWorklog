using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.TaskItems
{
    public class Create
    {
        public class Command : IRequest
        {
            public TaskItem TaskItem { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _context.TaskItems.Add(request.TaskItem);
                await _context.SaveChangesAsync();

                //return Unit.Value;
            }
        }
    }
}