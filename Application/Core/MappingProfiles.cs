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
                    o => o.MapFrom(d => d.Project.Name))
                .ForMember(s => s.RequestorName,
                    o => o.MapFrom(d => d.Requestor.FirstName + " " + d.Requestor.LastName))
                .ForMember(s => s.RequestorEmail,
                    o => o.MapFrom(d => d.Requestor.Email));


            CreateMap<TaskItemDto, TaskItem>()
                    .ForMember(s => s.Description,
                        o => o.MapFrom(d => d.Description))
                    .ForMember(s => s.TaskDate,
                        o => o.MapFrom(d => d.TaskDate))
                    .ForMember(s => s.Requestor, o => o.Ignore())
                    .ForMember(s => s.Project, o => o.Ignore())
                    .ForMember(s => s.Hidta, o => o.Ignore());       
            

            CreateMap<MonthlySummaryDto, MonthlySummaryDto>();
        }
    }
}