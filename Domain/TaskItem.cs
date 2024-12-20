using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Description { get; set; }   
        public DateTime TaskDate { get; set; }     
        public int HidtaId { get; set; }
        public int ProjectId { get; set; }
        public int RequestorId { get; set; }
        public Hidta Hidta { get; set; }
        public Project Project { get; set; }
        
    }
}