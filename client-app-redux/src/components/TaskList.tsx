import { useParams } from 'react-router-dom';
import { TaskItem, TaskItemFormValues } from '../models/TaskItem';
import Table from '../app/common/ui/Table';
import TaskItemRow from './TaskItemRow';
import Modal from '../pages/Modal';
import TaskItemForm from './TaskItemForm';
import NavButtons from './NavButtons';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useEffect } from 'react';
import { fetchTasks } from '../api/actions';


export default function TaskList() {
  const params = useParams();
  const month = +params!.month!;
  const year = +params!.year!;
  const defaultDate = new Date();
  const dispatch = useAppDispatch();

  const { tasks, isLoading } = useAppSelector((state) => state.log);

  useEffect(() => {
    fetchTasks(+params!.year!, +params!.month!, dispatch);
  }, [dispatch, params]);

  if (isLoading) return <div>Loading...</div>;

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
                data={tasks}
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
