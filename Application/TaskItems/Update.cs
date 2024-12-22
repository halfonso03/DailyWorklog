using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.EntityFrameworkCore.Metadata;
using Persistence;

namespace Application.TaskItems
{
    public class Update
    {
        public class Command : IRequest
        {
            public TaskItem TaskItem { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
            _mapper = mapper;
                _context = context;

            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var taskFromDb = await _context.TaskItems.FindAsync(request.TaskItem.Id);

                _mapper.Map(request.TaskItem, taskFromDb);

                await _context.SaveChangesAsync();
            }
        }
    }
}