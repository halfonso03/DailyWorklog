// import { useState } from 'react';

// import agent from '../api/agent';
// import { TaskItem } from '../models/TaskItem';
// import { LogContext } from './LogContext';

const LogProvider: React.FC<{ children: React.ReactNode }> = () => {
  // const [selectedTask, setSelectedTask] = useState<TaskItem | undefined>();
  // const [isDeleting, setIsDeleting] = useState(false);

  // const getSortedTasks = () => {
  //   return tasks.sort((a, b) => a.taskDate!.valueOf() - b.taskDate!.valueOf());
  // };

  // async function deleteTask(id: number) {
  //   try {
  //     setIsDeleting(true);
  //     await agent.TaskItems.delete(id);
  //     const existingTasks = [...tasks.filter((t) => t.id !== id)];
  //     setSortedTasks(existingTasks);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsDeleting(false);
  //   }
  // }

  // function getTasksForYearMonth(year: number, month: number) {
  //   return tasks.filter(
  //     (t) =>
  //       t.taskDate?.getFullYear() == year && t.taskDate.getMonth() === month - 1
  //   );
  // }

  // const loadTasks = useCallback(async function loadTasks(
  //   year: number,
  //   month: number
  // ) {
  //   try {
  //     setLoadingTasks(true);
  //     const response = await agent.TaskItems.get(year, month);
  //     setSortedTasks(response);
  //     setLoadingTasks(false);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoadingTasks(false);
  //   }
  // },
  // []);

  // function setSortedTasks(tasks: TaskItem[]) {
  //   const sortedTasks = Array.of<TaskItem>();
  //   tasks.forEach((t) => {
  //     sortedTasks.push({ ...t, taskDate: new Date(t.taskDate!) });
  //   });
  //   sortedTasks.sort((a, b) => a.taskDate!.valueOf() - b.taskDate!.valueOf());

  //   setTasks(sortedTasks);
  // }

  // useEffect(() => {
  //   // loadProjects();
  //   // loadHidtas();
  //   return () => setSelectedTask(undefined);
  // }, []);

  // return (
  //   <LogContext.Provider
  //     value={{
  //       selectedTask,
  //       setSelectedTask,
  //       isDeleting,
  //     }}
  //   >
  //     {children}
  //   </LogContext.Provider>
  // );

  return <div></div>;
};

export default LogProvider;
