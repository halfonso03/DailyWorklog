using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DbSet<TaskItem> TaskItems { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Hidta> Hidtas { get; set; }
        public DbSet<Requestor> Requestors { get; set; }


        public DataContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            

            modelBuilder.Entity<TaskItem>().ToTable("tblTaskItem").HasKey(x => x.Id);
            modelBuilder.Entity<Hidta>().ToTable("tblHidta").HasKey(x => x.Id);;
            modelBuilder.Entity<Project>().ToTable("tblProject").HasKey(x => x.Id);
            modelBuilder.Entity<Requestor>().ToTable("tblRequestor").HasKey(x => x.Id);


            modelBuilder.Entity<TaskItem>().Property(x => x.Id).HasColumnName("id");
            modelBuilder.Entity<TaskItem>().Property(x => x.Description).HasColumnName("description");
            modelBuilder.Entity<TaskItem>().Property(x => x.ProjectId).HasColumnName("project_id");
            modelBuilder.Entity<TaskItem>().Property(x => x.RequestorId).HasColumnName("requestor_id");
            modelBuilder.Entity<TaskItem>().Property(x => x.HidtaId).HasColumnName("hidta_id");
            modelBuilder.Entity<TaskItem>().Property(x => x.TaskDate).HasColumnName("task_date");

            modelBuilder.Entity<Hidta>().Property(x => x.Id).HasColumnName("id");
            modelBuilder.Entity<Hidta>().Property(x => x.Name).HasColumnName("name");

            modelBuilder.Entity<Project>().Property(x => x.Id).HasColumnName("id");
            modelBuilder.Entity<Project>().Property(x => x.Name).HasColumnName("name");
            
            modelBuilder.Entity<Requestor>().Property(x => x.FirstName).HasColumnName("first_name");
            modelBuilder.Entity<Requestor>().Property(x => x.LastName).HasColumnName("last_name");
            modelBuilder.Entity<Requestor>().Property(x => x.Email).HasColumnName("email");
            

            

            base.OnModelCreating(modelBuilder);
        }

        
    }
}