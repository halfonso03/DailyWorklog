using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.TaskItems
{
    public class Delete
    {
        public class Command :IRequest
        {
            public int Id { get; set; }
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
                var taskfromDb = await _context.TaskItems.FindAsync(request.Id);

                _context.TaskItems.Remove(taskfromDb);

                await _context.SaveChangesAsync();
            }
        }
    }
}