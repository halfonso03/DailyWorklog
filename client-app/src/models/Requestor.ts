export interface IRequestor {
    id: number;
    firstName: string;
    lastName: string;
    email?: string
  }
  
  export class Requestor implements IRequestor {
    id: number;
    firstName: string;
    lastName: string;
    email?: string
  
    constructor(init: { id: number; firstName: string, lastName: string, email: string }) {
      this.id = init.id;
      this.firstName = init.firstName;
      this.lastName = init.lastName;
      this.email = init.email;
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
  