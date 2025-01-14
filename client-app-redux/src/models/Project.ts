export interface IProject {
  id: number;
  name: string;
}

export class Project implements IProject {
  id: number;
  name: string;

  constructor(init: { id: number; name: string }) {
    this.id = init.id;
    this.name = init.name;
  }
}

// export class TaskItemFormValues {
//     id: number = 0;
//     description: string = '';
//     date: Date | null = null;

//     constructor(taskItem?: TaskItemFormValues) {
//         if (taskItem) {
//             this.id = taskItem.id;
//             this.description = taskItem.description;
//             this.description = taskItem.description;
//         }
//     }
// }
