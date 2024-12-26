using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.TaskItems;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<TaskItem, TaskItem>();
            CreateMap<TaskItem, TaskItemDto>()
                .ForMember(s => s.Hidta,
                    o => o.MapFrom(d => d.Hidta.Name))
                .ForMember(s => s.Project,
                    o => o.MapFrom(d => d.Project.Name));

            CreateMap<MonthlySummaryDto, MonthlySummaryDto>();
        }
    }
}