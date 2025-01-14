
import { TaskItem } from '../models/TaskItem';
import { createContext } from 'react';

export type LogContextType = {
  
  tasks: TaskItem[];
  loadingTasks: boolean;
  selectedTask: TaskItem | undefined;
  setSelectedTask: (taskItem: TaskItem | undefined) => void;
  getSortedTasks: () => TaskItem[];
  deleteTask: (id: number) => void;
  isDeleting: boolean;
  getTasksForYearMonth: (year: number, month: number) => TaskItem[];
  // getRequestors: (hidtaId: number) => void
};


export const LogContext = createContext<LogContextType | null>(null);
