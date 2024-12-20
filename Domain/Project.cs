using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<TaskItem> TaskItems { get; set; }
    }
}