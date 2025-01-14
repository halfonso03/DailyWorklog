import { Project } from '../models/Project';
import { Hidta } from '../models/Hidta';
import { TaskItem, TaskItemFormValues } from '../models/TaskItem';
import { createContext } from 'react';

export type LogContextType = {
    projects: Project[];
    hidtas: Hidta[];
    tasks: TaskItem[];
    loadingTasks: boolean;
    loadProjects: () => void;
    loadHidtas: () => void;
    createTask: (taskItem: TaskItemFormValues) => void;
    updateTask: (taskItem: TaskItemFormValues) => void;
    loadTasks: (year: number, month: number) => void;
    selectedTask: TaskItem | undefined;
    setSelectedTask: (taskItem: TaskItem | undefined) => void;
    getSortedTasks: () => TaskItem[];
    deleteTask: (id: number) => void;
    isDeleting: boolean;
    getTasksForYearMonth: (year: number, month: number) => TaskItem[];
    // getRequestors: (hidtaId: number) => void
  };
  
  
  export const LogContext = createContext<LogContextType | null>(null);
  