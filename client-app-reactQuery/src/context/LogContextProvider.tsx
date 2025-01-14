// // import { useReducer } from 'react';
// import { Project } from '../models/Project';
// import { Hidta } from '../models/Hidta';
// // import agent from '../api/agent';
// import { TaskItem } from '../models/TaskItem';
// import { LogContext } from './LogContext';

// interface State {
//   projects: Project[];
//   hidtas: Hidta[];
//   tasks: TaskItem[];
//   loadingTasks: boolean;
//   isDeleting: boolean;
//   selectedTask: TaskItem | undefined;
// }

// // const initialState: State = {
// //   projects: [],
// //   hidtas: [],
// //   tasks: [],
// //   loadingTasks: false,
// //   isDeleting: false,
// //   selectedTask: undefined,
// // };

// export type ACTIONTYPE =
//   | { type: 'setProjects'; payload: Project[] }
//   | { type: 'setHidtas'; payload: Hidta[] }
//   // | { type: 'setTasks'; payload: TaskItem[] }
//   | { type: 'loadingTasks'; payload: boolean }
//   | { type: 'setSelectedTask'; payload: TaskItem | undefined }
//   | { type: 'isDeleting'; payload: boolean };

// // function reducer(state: typeof initialState, action: ACTIONTYPE) {
// //   switch (action.type) {
// //     case 'setProjects':
// //       return { ...state, projects: action.payload };
// //     case 'setHidtas':
// //       return { ...state, hidtas: action.payload };
// //     case 'loadingTasks':
// //       return { ...state, loadingTasks: action.payload };
// //     case 'isDeleting':
// //       return { ...state, isDeleting: action.payload };
// //     case 'setSelectedTask':
// //       return { ...state, selectedTask: action.payload };
// //     default:
// //       throw new Error();
// //   }
// // }

// const LogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   // const [{ projects, hidtas, tasks }] = useReducer(reducer, initialState);

//   // const getSortedTasks = () => {
//   //   return tasks.sort((a, b) => a.taskDate!.valueOf() - b.taskDate!.valueOf());
//   // };

//   // async function deleteTask(id: number) {
//   //   try {
//   //     //dispatch({ type: 'isDeleting', payload: true });
//   //     await agent.TaskItems.delete(id);
//   //     const existingTasks = [...tasks.filter((t) => t.id !== id)];
//   //     sortTasks(existingTasks);
//   //   } catch (error) {
//   //     console.log(error);
//   //   } finally {
//   //     // dispatch({ type: 'isDeleting', payload: false });
//   //   }
//   // }

//   // function getTasksForYearMonth(year: number, month: number) {
//   //   return tasks.filter(
//   //     (t) =>
//   //       t.taskDate?.getFullYear() == year && t.taskDate.getMonth() === month - 1
//   //   );
//   // }

//   // function sortTasks(tasks: TaskItem[]) {
//   //   const sortedTasks = Array.of<TaskItem>();
//   //   tasks.forEach((t) => {
//   //     sortedTasks.push({ ...t, taskDate: new Date(t.taskDate!) });
//   //   });
//   //   sortedTasks.sort((a, b) => a.taskDate!.valueOf() - b.taskDate!.valueOf());
//   // }

//   return <LogContext.Provider value={{x:1}}>{children}</LogContext.Provider>;
// };

// export default LogProvider;
