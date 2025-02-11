using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Execution;
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
            public string SortBy { get; set; }
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

                var sorted = request.SortBy switch
                {
                    "date" => tasks.OrderBy(x => x.TaskDate),
                    "dateDESC" => tasks.OrderByDescending(x => x.TaskDate),
                    "desc" => tasks.OrderBy(x => x.Description),
                    "descDESC" => tasks.OrderByDescending(x => x.Description),
                    "hidta" => tasks.OrderBy(x => x.Hidta),
                    "hidtaDESC" => tasks.OrderByDescending(x => x.Hidta),
                    "project" => tasks.OrderBy(x => x.Project),
                    "projectDESC" => tasks.OrderByDescending(x => x.Project),
                    "requestor" => tasks.OrderBy(x => x.RequestorName),
                    "requestorDESC" => tasks.OrderByDescending(x => x.RequestorName),
                    _ => tasks.OrderBy(x => x.TaskDate)
                };

                return await sorted.ToListAsync();

            }
        }
    }
}