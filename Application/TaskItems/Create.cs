using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.TaskItems
{
    public class Create
    {
        public class Command : IRequest<Result<TaskItemDto>>
        {
            public TaskItem TaskItem { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<TaskItemDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                 _mapper = mapper;
                _context = context;
            }            

            public async Task<Result<TaskItemDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.TaskItems.Add(request.TaskItem);
                

                if (request.TaskItem.Requestor?.Id == 0)
                {
                    request.TaskItem.Requestor.HidtaId = request.TaskItem.HidtaId;
                }

                await _context.SaveChangesAsync();

                var taskItemDto = _mapper.Map<TaskItem, TaskItemDto>(request.TaskItem);

                return Result<TaskItemDto>.Success(taskItemDto);
            }
        }
    }
}