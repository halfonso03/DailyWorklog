using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Requestor
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [EmailAddress]
        public string Email { get; set; }
        public int HidtaId { get; set; }
        public Hidta Hidta { get; set; }
        public ICollection<TaskItem> TaskItems { get; set; }
    }
}