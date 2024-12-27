import { FaTrash } from 'react-icons/fa6';
import Table from '../app/common/ui/Table';
import FormatDate from '../app/utils/formatDate';
import { TaskItem } from '../models/TaskItem';

import Modal from '../pages/Modal';
import TaskItemForm from './TaskItemForm';
import { FaEdit } from 'react-icons/fa';
import ConfirmDelete from './ConfirmDelete';

interface Props {
  taskItem: TaskItem;
}
export default function TaskItemRow({ taskItem }: Props) {
  return (
    <>
      <Table.Cell>
        <div className="flex gap-3 cursor-pointer opacity-80">
          <Modal.Open opens={taskItem.id.toString()}>
            <button>
              <FaEdit></FaEdit>
            </button>
          </Modal.Open>
          <Modal.Window name={taskItem.id.toString()} $size="medium">
            <TaskItemForm taskItem={taskItem}></TaskItemForm>

          </Modal.Window>
          <Modal.Open opens={taskItem.id.toString() + '_delete'}>
            <button className="text-red-500">
              <FaTrash></FaTrash>
            </button>
          </Modal.Open>
          <Modal.Window name={taskItem.id.toString() + '_delete'} $size="small">
            <ConfirmDelete taskItem={taskItem}></ConfirmDelete>
          </Modal.Window>
        </div>
      </Table.Cell>
      <Table.Cell>{FormatDate(taskItem.taskDate!)}</Table.Cell>
      <Table.Cell>{taskItem.description}</Table.Cell>
      <Table.Cell>{taskItem.hidta}</Table.Cell>
      <Table.Cell>{taskItem.project}</Table.Cell>
      <Table.Cell>requestor</Table.Cell>
    </>
  );
}
