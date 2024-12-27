import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { TaskItem } from '../models/TaskItem';
import Table from '../app/common/ui/Table';
import TaskItemRow from './TaskItemRow';
import { useLogContext } from '../context/useLogContext';
import { ClipLoader } from 'react-spinners';
import Modal from '../pages/Modal';
import TaskItemForm from './TaskItemForm';

export default function TaskList() {
  const params = useParams();
  const { tasks, loadTasks, loadingTasks } = useLogContext();

  // let tasks = getSortedTasks();

  useEffect(() => {
    loadTasks(+params!.year!, +params!.month!);
    return () => {};
  }, [loadTasks, params, params.month, params.year]);

  if (!tasks) return <div>No data</div>;

  // if (loadingTasks) return <div>Loading...</div>;

  return (
    <>
      <div className="w-full">
        {loadingTasks ? (
          <div className="z-50 absolute top-0 left-0 w-full h-full flex items-start align-middle justify-center">
            <div className="relative self-center ">
              <ClipLoader color="white" size={30}></ClipLoader>
            </div>
          </div>
        ) : (
          <>
            <Modal>
              <Modal.Open opens="add">
                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    className="w-1/12 min-h-0.5 p-1 rounded-sm font-semibold text-black hover:text-black hover:bg-slate-100 bg-slate-200"
                  >
                    Add Task
                  </button>
                </div>
              </Modal.Open>
              <Modal.Window name="add" $size="medium">
                <TaskItemForm></TaskItemForm>
              </Modal.Window>
            </Modal>
            <Modal>
              <Table columns=".35fr .5fr 1fr .8fr .8fr 1fr">
                <Table.Header>
                  <Table.Cell></Table.Cell>
                  <Table.Cell>Date</Table.Cell>
                  <Table.Cell>Description</Table.Cell>
                  <Table.Cell>Hidta</Table.Cell>
                  <Table.Cell>Project</Table.Cell>
                  <Table.Cell>Requestor</Table.Cell>
                </Table.Header>
                <Table.Body
                  data={tasks}
                  render={(taskItem: TaskItem) => (
                    <TaskItemRow
                      key={taskItem.id}
                      taskItem={taskItem}
                    ></TaskItemRow>
                  )}
                ></Table.Body>
              </Table>
            </Modal>
          </>
        )}
      </div>
    </>
  );
}
