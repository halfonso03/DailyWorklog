
export interface ITaskItem {
    id: number
    taskDate: Date | null
    hidtaId: number;
    projectId: number;
    requestorId: number;
    description: string;
    hidta?: string;
    project?: string;
}

export class TaskItem implements ITaskItem {

    id: number;
    taskDate: Date | null;
    hidtaId: number;
    projectId: number;
    requestorId: number;
    description: string;
    hidta?: string;
    project?: string;


    constructor(init: TaskItemFormValues) {
        this.id = init.id;
        this.taskDate = init.taskDate;
        this.hidtaId = init.hidtaId ? +init.hidtaId : 0;
        this.projectId = init.projectId ? +init.projectId : 0;
        this.description = init.description;
        this.requestorId = init.requestorId;
    }
}

export class TaskItemFormValues {
    id: number = 0;
    description: string = '';
    hidtaId: number = 0;
    projectId: number = 0;
    requestorId: number = 0;
    taskDate: Date | null = null;
    requestorName: string | null = '';
    requestorEmail: string | null = '';


    constructor(taskItem?: TaskItem) {
        if (taskItem) {
            this.id = taskItem.id;
            this.hidtaId = taskItem.hidtaId;
            this.projectId = taskItem.projectId;
            this.taskDate = taskItem.taskDate;
            this.description = taskItem.description;
            this.requestorId = taskItem.requestorId
        } else {
            this.taskDate = new Date();
        }
    }
}