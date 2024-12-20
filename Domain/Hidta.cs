
namespace Domain
{
    public class Hidta
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<TaskItem> TaskItems { get; set; }
    }
}