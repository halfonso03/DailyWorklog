/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { TaskItem } from '../models/TaskItem';
import Table from '../app/common/ui/Table';
import TaskItemRow from './TaskItemRow';
import { useLogContext } from '../context/useLogContext';
import { ClipLoader } from 'react-spinners';

export default function TaskList() {
  
  const params = useParams();
  const { tasks, loadTasks, loadingTasks } = useLogContext();

  // const [taskItems, setTaskItems] = useState<TaskItem[]>([]);

  // const getTasks = useCallback(
  //   async function getTasks() {
  //     const response = await agent.TaskItems.get(+params.year!, +params.month!);
  //     setTaskItems(response);
  //   },
  //   [params.month, params.year]
  // );

  useEffect(() => {
    loadTasks(+params!.year!, +params!.month!);
    return () => {};
  }, [loadTasks, params, params.month, params.year]);

  if (!tasks) return <div>No data</div>;
  // if (loadingTasks) return <div>Loading...</div>;

  //console.log('task list render');

  return (
    <div className="w-full">
      {loadingTasks ? (
        <div className="z-50 absolute top-0 left-0 w-full h-full flex items-start align-middle justify-center">
          <div className="relative self-center ">
            <ClipLoader color="white" size={30}></ClipLoader>
          </div>
        </div>
      ) : (
        <Table columns=".35fr .5fr 1fr 1fr 1fr">
          <Table.Header>
            <Table.Cell></Table.Cell>
            <Table.Cell>Date</Table.Cell>
            <Table.Cell>Description</Table.Cell>
            <Table.Cell>Hidta</Table.Cell>
            <Table.Cell>Other</Table.Cell>
          </Table.Header>
          <Table.Body
            data={tasks}
            render={(taskItem: TaskItem) => (
              <TaskItemRow key={taskItem.id} taskItem={taskItem}></TaskItemRow>
            )}
          ></Table.Body>
        </Table>
      )}
    </div>
  );
}
