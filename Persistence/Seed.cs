using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.Identity.Client;

namespace Persistence
{
    public class Seed()
    {


        public static async Task SeedData(DataContext context)
        {

            if (!context.Requestors.Any())
            {
                context.Requestors.Add(new Requestor { Email = "bob@test.com", FirstName = "bob", LastName = "Smith" });
            }

            if (!context.Projects.Any())
            {
                context.Projects.Add(new Project { Name = "CMS" });
                context.Projects.Add(new Project { Name = "FMS" });
                context.Projects.Add(new Project { Name = "HIDTA.net" });
                context.Projects.Add(new Project { Name = "HOTT" });
                context.Projects.Add(new Project { Name = "IPSS" });                
                context.Projects.Add(new Project { Name = "Other" });

                await context.SaveChangesAsync();
            }

            if (!context.Hidtas.Any())
            {

                context.Hidtas.Add(new Hidta { Name = "Alaska" });
                context.Hidtas.Add(new Hidta { Name = "Appalachia" });
                context.Hidtas.Add(new Hidta { Name = "Arizona" });
                context.Hidtas.Add(new Hidta { Name = "Atlanta-Carolinas" });
                context.Hidtas.Add(new Hidta { Name = "Central Florida" });
                context.Hidtas.Add(new Hidta { Name = "Central Valley - California" });
                context.Hidtas.Add(new Hidta { Name = "Chicago" });
                context.Hidtas.Add(new Hidta { Name = "Gulf Coast" });
                context.Hidtas.Add(new Hidta { Name = "Hawaii" });
                context.Hidtas.Add(new Hidta { Name = "Houston" });
                context.Hidtas.Add(new Hidta { Name = "Indiana" });
                context.Hidtas.Add(new Hidta { Name = "Liberty Mid-Atlantic" });
                context.Hidtas.Add(new Hidta { Name = "LInX" });
                context.Hidtas.Add(new Hidta { Name = "Los Angeles" });
                context.Hidtas.Add(new Hidta { Name = "Michigan" });
                context.Hidtas.Add(new Hidta { Name = "Midwest" });
                context.Hidtas.Add(new Hidta { Name = "National HIDTA Assistance Center" });
                context.Hidtas.Add(new Hidta { Name = "Nevada" });
                context.Hidtas.Add(new Hidta { Name = "New England" });
                context.Hidtas.Add(new Hidta { Name = "New Mexico" });
                context.Hidtas.Add(new Hidta { Name = "New York - New Jersey" });
                context.Hidtas.Add(new Hidta { Name = "Non-HIDTA" });
                context.Hidtas.Add(new Hidta { Name = "North Central" });
                context.Hidtas.Add(new Hidta { Name = "North Florida" });
                context.Hidtas.Add(new Hidta { Name = "Northern California" });
                context.Hidtas.Add(new Hidta { Name = "Northwest" });
                context.Hidtas.Add(new Hidta { Name = "Ohio" });
                context.Hidtas.Add(new Hidta { Name = "Oregon - Idaho" });
                context.Hidtas.Add(new Hidta { Name = "Puerto Rico - Virgin Islands" });
                context.Hidtas.Add(new Hidta { Name = "Rocky Mountain" });
                context.Hidtas.Add(new Hidta { Name = "San Diego-Imperial Valley" });
                context.Hidtas.Add(new Hidta { Name = "South Florida" });
                context.Hidtas.Add(new Hidta { Name = "South Texas" });
                context.Hidtas.Add(new Hidta { Name = "Texoma" });
                context.Hidtas.Add(new Hidta { Name = "Washington - Baltimore" });
                context.Hidtas.Add(new Hidta { Name = "West Texas" });
            }


            if (!context.TaskItems.Any())
            {
                context.TaskItems.Add(new()
                {
                    Description = "New Task 1",
                    HidtaId = 1,
                    ProjectId = 1,
                    TaskDate = DateTime.Now,
                    RequestorId = 1
                });
                context.TaskItems.Add(new()
                {
                    Description = "New Task 2",
                    HidtaId = 2,
                    ProjectId = 2,
                    TaskDate = DateTime.Now,
                    RequestorId = 1
                });
                context.TaskItems.Add(new()
                {
                    Description = "New Task 3",
                    HidtaId = 3,
                    ProjectId = 3,
                    TaskDate = DateTime.Now,
                    RequestorId = 1
                });
                context.TaskItems.Add(new()
                {
                    Description = "New Task 4",
                    HidtaId = 1,
                    ProjectId = 2,
                    TaskDate = DateTime.Now,
                    RequestorId = 1
                });
            }

            await context.SaveChangesAsync();

        }
    }
}