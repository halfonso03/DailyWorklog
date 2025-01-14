import { Project } from '../models/Project';
import { Hidta } from '../models/Hidta';
import { TaskItem } from '../models/TaskItem';
import { createContext } from 'react';

export type LogContextType = {
  projects: Project[];
  hidtas: Hidta[];
  tasks: TaskItem[];  
  // isDeleting: boolean;  
  // updateTask: (taskItem: TaskItemFormValues) => void;
  getSortedTasks: () => TaskItem[];
  // deleteTask: (id: number) => void;
  getTasksForYearMonth: (year: number, month: number) => TaskItem[];
};


export const LogContext = createContext<LogContextType | null>(null);
