import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { TaskItem, TaskItemFormValues } from '../models/TaskItem';
import Table from '../app/common/ui/Table';
import TaskItemRow from './TaskItemRow';
import { useLogContext } from '../context/useLogContext';

import Modal from '../pages/Modal';
import TaskItemForm from './TaskItemForm';
import NavButtons from './NavButtons';

export default function TaskList() {
  const params = useParams();
  const month = +params!.month!;
  const year = +params!.year!;
  const defaultDate = new Date(`${month}/1/${year}`);

  const { tasks, loadTasks, getTasksForYearMonth } = useLogContext();
  

  useEffect(() => {
    loadTasks(+params!.year!, +params!.month!);
    return () => {};
  }, [loadTasks, params, params.month, params.year]);

  if (!tasks) return <div>No data</div>;

  return (
    <>
      <div className="w-full">
        <>
          <Modal>
            <Modal.Open opens="add">
              <button
                type="button"
                className="w-1/12 min-h-0.5 p-1 rounded-sm font-semibold text-black hover:text-black hover:bg-slate-100 bg-slate-200"
              >
                Add Task
              </button>
            </Modal.Open>
            <Modal.Window name="add" $size="medium">
              <TaskItemForm defaultDate={defaultDate}></TaskItemForm>
            </Modal.Window>
          </Modal>
          <Modal>
            <NavButtons currentDate={`${month}/1/${year}`}></NavButtons>
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
                data={getTasksForYearMonth(+params!.year!, +params!.month!)}
                render={(taskItem: TaskItem) => (
                  <TaskItemRow
                    key={taskItem.id}
                    taskItemFormValues={new TaskItemFormValues(taskItem)}
                  ></TaskItemRow>
                )}
              ></Table.Body>
            </Table>
          </Modal>
        </>
      </div>
    </>
  );
}
