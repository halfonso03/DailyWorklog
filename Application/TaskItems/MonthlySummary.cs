using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
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
    public class MonthlySummary
    {
        public class Query : IRequest<List<MonthlySummaryDto>>
        {
            public int Year { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<MonthlySummaryDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;                
            }

            public async Task<List<MonthlySummaryDto>> Handle(Query request, CancellationToken cancellationToken)
            {


                var tasks = await _context.TaskItems
                                   .Where(x => x.TaskDate.Year == request.Year)
                                   .ToListAsync();

                var summary = (from t2 in tasks
                               group t2 by new { 
                                m = t2.TaskDate.Month, 
                                mn = $"{t2.TaskDate:MMMM}" } into grp
                               select new MonthlySummaryDto
                               {
                                   MonthIndex = grp.Key.m,       
                                   MonthName = grp.Key.mn,                            
                                   TaskItemCount = grp.Count()
                               })                              
                              .ToList();

                var months = Enumerable.Range(1, 12)
                    .Select(i =>
                        new MonthlySummaryDto
                        {
                            MonthIndex = i,
                            TaskItemCount = summary.FirstOrDefault(m => m.MonthIndex == i)?.TaskItemCount ?? 0,
                            MonthName = DateTimeFormatInfo.CurrentInfo.GetMonthName(i)
                        })
                    .ToList();



                return months;

                //return await tasks).ToListAsync(cancellationToken);

            }
        }
    }
}