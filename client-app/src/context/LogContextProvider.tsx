import { useCallback, useEffect, useState } from 'react';
import { Project } from '../models/Project';
import { Hidta } from '../models/Hidta';
import agent from '../api/agent';
import { TaskItem, TaskItemFormValues } from '../models/TaskItem';
import { LogContext } from './LogContext';

const LogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [projects, setProjects] = useState<Project[]>([]);
  const [hidtas, setHidtas] = useState<Hidta[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskItem | undefined>();
  const [isDeleting, setIsDeleting] = useState(false);

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

  const getSortedTasks = () => {
    return tasks.sort((a, b) => a.taskDate!.valueOf() - b.taskDate!.valueOf());
  };

  async function createTask(values: TaskItemFormValues) {
    const shapedTask =
      values.requestorName?.trim() !== ''
        ? {
            ...values,
            requestorName: '',
            requestor: {
              firstName: values.requestorName?.split(' ')[0],
              lastName: values.requestorName?.split(' ')[1],
              email: values.requestorEmail,
            },
          }
        : {
            ...values,
            requestorName: '',
          };

    const response = await agent.TaskItems.create(shapedTask);

    const newTask: TaskItem = {
      ...values,
      id: response.id,
      requestorId: response.requestorId,
      hidta: hidtas.find((x) => x.id == response.hidtaId)?.name,
      project: projects.find((x) => x.id == response.projectId)?.name,
      requestorName: response.requestorName,
    };

    setSortedTasks([...tasks, newTask]);
  }

  async function updateTask(values: TaskItemFormValues) {
    try {
      if (values.requestorId <= -1) {
        values.requestorId = 0;
      }

      const updatedTask = {
        ...values,
        hidtaId: +values.hidtaId,
        projectId: +values.projectId,
      };

      const response = await agent.TaskItems.update(updatedTask);

      const taskItem = {
        ...new TaskItem(values),
        hidta: hidtas.find((x) => x.id == +values.hidtaId)?.name,
        project: projects.find((x) => x.id == +values.projectId)?.name,
        requestorId: response.requestorId,
        requestorName: response.requestorName,
      };

      const existingTasks = [...tasks.filter((t) => t.id !== values.id)];
      existingTasks.push(taskItem);

      setSortedTasks(existingTasks);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTask(id: number) {
    try {
      setIsDeleting(true);
      await agent.TaskItems.delete(id);
      const existingTasks = [...tasks.filter((t) => t.id !== id)];
      setSortedTasks(existingTasks);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  }

  function getTasksForYearMonth(year: number, month: number) {
    return tasks.filter(t => t.taskDate?.getFullYear() ==  year && t.taskDate.getMonth() === (month - 1)); 
  }

  const loadTasks = useCallback(async function loadTasks(
    year: number,
    month: number
  ) {
    try {
      setLoadingTasks(true);
      const response = await agent.TaskItems.get(year, month);
      setSortedTasks(response);
      setLoadingTasks(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTasks(false);
    }
  },
  []);

  function setSortedTasks(tasks: TaskItem[]) {
    const sortedTasks = Array.of<TaskItem>();
    tasks.forEach((t) => {
      sortedTasks.push({ ...t, taskDate: new Date(t.taskDate!) });
    });
    sortedTasks.sort((a, b) => a.taskDate!.valueOf() - b.taskDate!.valueOf());

    setTasks(sortedTasks);
  }

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
        updateTask,
        loadTasks,
        tasks,
        loadingTasks,
        selectedTask,
        setSelectedTask,
        getSortedTasks,
        deleteTask,
        isDeleting,
        getTasksForYearMonth
            }}
    >
      {children}
    </LogContext.Provider>
  );
};

export default LogProvider;
