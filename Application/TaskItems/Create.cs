using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
                var newTask = request.TaskItem;

                _context.TaskItems.Add(newTask);
                

                if (request.TaskItem.Requestor?.Id == 0)
                {
                    request.TaskItem.Requestor.HidtaId = request.TaskItem.HidtaId;
                }

                await _context.SaveChangesAsync();


                if (newTask.Requestor == null)
                {
                    var req = await _context.Requestors.FirstAsync(r => r.Id == newTask.RequestorId);

                    newTask.Requestor = req;
                }

                var taskItemDto = _mapper.Map<TaskItem, TaskItemDto>(request.TaskItem);

                return Result<TaskItemDto>.Success(taskItemDto);
            }
        }
    }
}