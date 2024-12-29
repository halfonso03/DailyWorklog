using System.Linq;
using System.Linq.Expressions;
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
    public class Update
    {
        public class Command : IRequest<Result<TaskItemDto>>
        {
            public TaskItemDto TaskItemDto { get; set; }
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

                var dto = request.TaskItemDto;

                var taskFromDb = await _context.TaskItems
                        .Include( r => r.Requestor)
                        .Include( r => r.Project)
                        .Include( r => r.Hidta)
                        .FirstAsync(t => t.Id == dto.Id);

                if (taskFromDb.HidtaId == request.TaskItemDto.HidtaId)
                {
                    if (dto.RequestorId == 0)   // new  requestor
                    {
                        _mapper.Map(dto, taskFromDb);

                        taskFromDb.RequestorId = 0;
                        taskFromDb.Requestor = new()
                        {
                            FirstName = dto.RequestorName.Trim().Split(" ")[0],
                            LastName = dto.RequestorName.Trim().Split(" ")[1],
                            Email = dto.RequestorEmail.Trim(),
                            HidtaId = dto.HidtaId
                        };                        
                    }
                    else
                    {
                        _mapper.Map(dto, taskFromDb);
                    }
                }
                else
                {
                    if (dto.RequestorId != 0)   // different hidta, existing  requestor
                    {
                        _mapper.Map(dto, taskFromDb);
                    }
                    else
                    {
                        _mapper.Map(dto, taskFromDb);

                        taskFromDb.RequestorId = 0;
                        taskFromDb.Requestor = new()
                        {
                            FirstName = dto.RequestorName.Trim().Split(" ")[0],
                            LastName = dto.RequestorName.Trim().Split(" ")[1],
                            Email = dto.RequestorEmail.Trim(),
                            HidtaId = dto.HidtaId
                        };
                    }
                }


                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (System.Exception ex)
                {
                    return Result<TaskItemDto>.Failure($"Error updating task. Message: {ex.Message}");
                }
                

                var taskItemDto = _mapper.Map<TaskItem, TaskItemDto>(taskFromDb);

                return Result<TaskItemDto>.Success(taskItemDto);
                
            }
        }
    }
}