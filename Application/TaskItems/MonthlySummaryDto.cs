using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Threading.Tasks;

namespace Application.TaskItems
{
    public class MonthlySummaryDto
    {
        public int MonthIndex { get; set; }
        public string MonthName { get; set; }
        public int TaskItemCount { get; set; }
    }
}