import { Project } from '../models/Project';
import { Hidta } from '../models/Hidta';
import { TaskItem, TaskItemFormValues } from '../models/TaskItem';
import { createContext } from 'react';
import { ACTIONTYPE } from './LogContextProvider';

export type LogContextType = {
    projects: Project[];
    hidtas: Hidta[];
    tasks: TaskItem[];
    loadingTasks: boolean;
    isDeleting: boolean;
    selectedTask: TaskItem | undefined;
    loadProjects: () => void;
    loadHidtas: () => void;
    createTask: (taskItem: TaskItemFormValues) => void;
    updateTask: (taskItem: TaskItemFormValues) => void;
    loadTasks: (year: number, month: number) => void;    
    // setSelectedTask: (taskItem: TaskItem | undefined) => void;
    getSortedTasks: () => TaskItem[];
    deleteTask: (id: number) => void;    
    getTasksForYearMonth: (year: number, month: number) => TaskItem[];
    dispatch: React.Dispatch<ACTIONTYPE>
  };
  
  
  export const LogContext = createContext<LogContextType | null>(null);
  