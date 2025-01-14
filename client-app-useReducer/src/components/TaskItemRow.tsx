import { FaTrash } from 'react-icons/fa6';
import Table from '../app/common/ui/Table';
import FormatDate from '../app/utils/formatDate';
import { TaskItem, TaskItemFormValues } from '../models/TaskItem';

import Modal from '../pages/Modal';
import TaskItemForm from './TaskItemForm';
import { FaEdit } from 'react-icons/fa';
import ConfirmDelete from './ConfirmDelete';

interface Props {
  taskItemFormValues: TaskItemFormValues;
}

export default function TaskItemRow({ taskItemFormValues }: Props) {
  return (
    <>
      <Table.Cell>
        <div className="flex gap-3 cursor-pointer opacity-80">
          <Modal.Open opens={taskItemFormValues.id.toString()}>
            <button>
              <FaEdit></FaEdit>
            </button>
          </Modal.Open>
          <Modal.Window name={taskItemFormValues.id.toString()} $size="medium">
            <TaskItemForm
              taskItem={taskItemFormValues as TaskItem}
            ></TaskItemForm>
          </Modal.Window>
          <Modal.Open opens={taskItemFormValues.id.toString() + '_delete'}>
            <button className="text-red-500">
              <FaTrash></FaTrash>
            </button>
          </Modal.Open>
          <Modal.Window
            name={taskItemFormValues.id.toString() + '_delete'}
            $size="small"
          >
            <ConfirmDelete taskItem={taskItemFormValues}></ConfirmDelete>
          </Modal.Window>
        </div>
      </Table.Cell>
      <Table.Cell>{FormatDate(taskItemFormValues.taskDate!)}</Table.Cell>
      <Table.Cell>{taskItemFormValues.description}</Table.Cell>
      <Table.Cell>{(taskItemFormValues as TaskItem).hidta}</Table.Cell>
      <Table.Cell>{(taskItemFormValues as TaskItem).project}</Table.Cell>
      <Table.Cell>{taskItemFormValues.requestorName}</Table.Cell>
    </>
  );
}
