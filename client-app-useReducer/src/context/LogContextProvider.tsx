import { useCallback, useEffect, useReducer } from 'react';
import { Project } from '../models/Project';
import { Hidta } from '../models/Hidta';
import agent from '../api/agent';
import { TaskItem, TaskItemFormValues } from '../models/TaskItem';
import { LogContext } from './LogContext';

interface State {
  projects: Project[];
  hidtas: Hidta[];
  tasks: TaskItem[];
  loadingTasks: boolean;
  isDeleting: boolean;
  selectedTask: TaskItem | undefined;
}

const initialState: State = {
  projects: [],
  hidtas: [],
  tasks: [],
  loadingTasks: false,
  isDeleting: false,
  selectedTask: undefined,
};

export type ACTIONTYPE =
  | { type: 'setProjects'; payload: Project[] }
  | { type: 'setHidtas'; payload: Hidta[] }
  | { type: 'setTasks'; payload: TaskItem[] }
  | { type: 'loadingTasks'; payload: boolean }
  | { type: 'setSelectedTask'; payload: TaskItem | undefined }
  | { type: 'isDeleting'; payload: boolean };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'setProjects':
      return { ...state, projects: action.payload };
    case 'setHidtas':
      return { ...state, hidtas: action.payload };
    case 'setTasks':
      return { ...state, tasks: action.payload };
    case 'loadingTasks':
      return { ...state, loadingTasks: action.payload };
    case 'isDeleting':
      return { ...state, isDeleting: action.payload };
    case 'setSelectedTask':
      return { ...state, selectedTask: action.payload };
    default:
      throw new Error();
  }
}

const LogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [
    { projects, hidtas, tasks, loadingTasks, selectedTask, isDeleting },
    dispatch,
  ] = useReducer(reducer, initialState);

  const loadProjects = () => {
    agent.Projects.get()
      .then(
        (response) => {
          dispatch({
            type: 'setProjects',
            payload: response.map((p) => ({ id: p.id, name: p.name })),
          });
        }
        // setProjects(response.map((p: Project) => ({ id: p.id, name: p.name })))
      )
      .catch((error) => {
        console.log('loadProjects error', error);
      });
  };

  const loadHidtas = () => {
    agent.Hidtas.get()
      .then((response) => {
        dispatch({
          type: 'setHidtas',
          payload: response.map((h: Hidta) => ({ id: h.id, name: h.name })),
        });
        // setHidtas(response.map((h: Hidta) => ({ id: h.id, name: h.name })))
      })
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

    sortTasks([...tasks, newTask]);
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
        project: projects.find((x: Project) => x.id == +values.projectId)?.name,
        requestorId: response.requestorId,
        requestorName: response.requestorName,
      };

      const existingTasks = [...tasks.filter((t) => t.id !== values.id)];
      existingTasks.push(taskItem);

      sortTasks(existingTasks);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTask(id: number) {
    try {
      dispatch({ type: 'isDeleting', payload: true });
      await agent.TaskItems.delete(id);
      const existingTasks = [...tasks.filter((t) => t.id !== id)];
      sortTasks(existingTasks);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: 'isDeleting', payload: false });
    }
  }

  function getTasksForYearMonth(year: number, month: number) {
    return tasks.filter(
      (t) =>
        t.taskDate?.getFullYear() == year && t.taskDate.getMonth() === month - 1
    );
  }

  const loadTasks = useCallback(async function loadTasks(
    year: number,
    month: number
  ) {
    try {
      dispatch({ type: 'loadingTasks', payload: true });
      const response = await agent.TaskItems.get(year, month);
      sortTasks(response);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: 'loadingTasks', payload: false });
      // setLoadingTasks(false);
    }
  },
  []);

  function sortTasks(tasks: TaskItem[]) {
    const sortedTasks = Array.of<TaskItem>();
    tasks.forEach((t) => {
      sortedTasks.push({ ...t, taskDate: new Date(t.taskDate!) });
    });
    sortedTasks.sort((a, b) => a.taskDate!.valueOf() - b.taskDate!.valueOf());
    dispatch({
      type: 'setTasks',
      payload: sortedTasks,
    });
  }

  useEffect(() => {
    loadProjects();
    loadHidtas();
    return () => dispatch({ type: 'setSelectedTask', payload: undefined });
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
        getSortedTasks,
        deleteTask,
        isDeleting,
        getTasksForYearMonth,
        dispatch,
      }}
    >
      {children}
    </LogContext.Provider>
  );
};

export default LogProvider;
