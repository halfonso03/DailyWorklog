using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.TaskItems
{
    public class List
    {
        public class Query : IRequest<List<TaskItemDto>>
        {
            public int Year { get; set; }
            public int Month { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<TaskItemDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;                
            }

            public async Task<List<TaskItemDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var tasks = _context
                                .TaskItems
                                .Include(p => p.Project)
                                .Include(h => h.Hidta)
                                .Include(r => r.Requestor)
                                .Where(x => x.TaskDate.Year == request.Year)
                                .ProjectTo<TaskItemDto>(_mapper.ConfigurationProvider)
                                .AsQueryable();

                if (request.Month != 0)
                {
                    tasks = tasks.Where(x => x.TaskDate.Month == request.Month);
                }

                return await tasks.OrderBy(x => x.TaskDate).ToListAsync(cancellationToken);

            }
        }
    }
}