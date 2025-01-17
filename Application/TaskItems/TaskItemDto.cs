using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Threading.Tasks;
using Domain;

namespace Application.TaskItems
{
    public class TaskItemDto
    {
        public int Id { get; set; }
        public string Description { get; set; }   
        public DateTime TaskDate { get; set; }     
        public int HidtaId { get; set; }
        public int ProjectId { get; set; }
        public int RequestorId { get; set; }
        public string Hidta { get; set; }
        public string Project { get; set; }
        public string RequestorName { get; set; }
        public string RequestorEmail { get; set; }
    }
}