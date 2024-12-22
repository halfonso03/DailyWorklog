
export interface ITaskItem {
    id: number
    date: Date | null
    description: string
}

export class TaskItem implements ITaskItem {

    id: number
    date: Date | null
    description: string


    constructor(init: TaskItemFormValues) {
        this.id = init.id;
        this.date = init.date;
        this.description = init.description;
    }
}

export class TaskItemFormValues {
    id: number = 0;
    description: string = '';
    date: Date | null = null;


    constructor(taskItem?: TaskItemFormValues) {
        if (taskItem) {
            this.id = taskItem.id;
            this.description = taskItem.description;
            this.description = taskItem.description;
        }
    }
}