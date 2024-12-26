/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useCallback, useEffect, useState } from 'react';
import { Project } from '../models/Project';
import { Hidta } from '../models/Hidta';
import agent from '../api/agent';
import { TaskItem, TaskItemFormValues } from '../models/TaskItem';

export type LogContextType = {
  projects: Project[];
  hidtas: Hidta[];
  tasks: TaskItem[];
  loadingTasks: boolean;
  loadProjects: () => void;
  loadHidtas: () => void;
  createTask: (taskItem: TaskItemFormValues) => void;
  loadTasks: (year: number, month: number) => void;
  selectedTask: TaskItem | undefined;
  setSelectedTask: (taskItem: TaskItem | undefined) => void;
  //clearTasks
};

export const LogContext = createContext<LogContextType | null>(null);

const LogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [projects, setProjects] = useState<Project[]>([]);
  const [hidtas, setHidtas] = useState<Hidta[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(false); // const [summary, setSummary] = useState<[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskItem | undefined>();

  const loadProjects = () => {
    agent.Projects.get()
      .then((response) =>
        setProjects(response.map((p: Project) => ({ id: p.id, name: p.name })))
      )
      .catch((error) => {
        console.log('loadProjects error', error);
      });
  };

  const loadHidtas = () => {
    agent.Hidtas.get()
      .then((response) =>
        setHidtas(response.map((h: Hidta) => ({ id: h.id, name: h.name })))
      )
      .catch((error) => {
        console.log('loadHidtas error', error);
      });
  };

  async function createTask(values: TaskItemFormValues) {
    await agent.TaskItems.create(new TaskItem(values));
    const month = values.taskDate!.getMonth() + 1;
    const year = values.taskDate!.getFullYear();
    loadTasks(year, month);
  }

  const loadTasks = useCallback(async function loadTasks(
    year: number,
    month: number
  ) {
    try {
      setLoadingTasks(true);
      const response = await agent.TaskItems.get(year, month);
      setTasks(response);
      setLoadingTasks(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTasks(false);
    }
  },
  []);

  useEffect(() => {
    loadProjects();
    loadHidtas();
    return () => setSelectedTask(undefined);
  }, []);

  return (
    <LogContext.Provider
      value={{
        projects,
        loadProjects,
        hidtas,
        loadHidtas,
        createTask,
        loadTasks,
        tasks,
        loadingTasks,
        selectedTask,
        setSelectedTask,
      }}
    >
      {children}
    </LogContext.Provider>
  );
};

export default LogProvider;
