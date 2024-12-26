import { FaPencil, FaTrash } from 'react-icons/fa6';
import Table from '../app/common/ui/Table';
import FormatDate from '../app/utils/formatDate';
import { TaskItem } from '../models/TaskItem';
import { useLogContext } from '../context/useLogContext';

interface Props {
  taskItem: TaskItem;
}
export default function TaskItemRow({ taskItem }: Props) {
  const { setSelectedTask } = useLogContext();

  return (
    <>
      <Table.Cell>
        <div className="flex gap-3 cursor-pointer opacity-60">
          <button onClick={() => setSelectedTask(taskItem)}>
            <FaPencil></FaPencil>
          </button>
          <button className="text-red-700">
            <FaTrash></FaTrash>
          </button>
        </div>
      </Table.Cell>
      <Table.Cell>{FormatDate(taskItem.taskDate!)}</Table.Cell>
      <Table.Cell>{taskItem.description}</Table.Cell>
      <Table.Cell>{taskItem.hidta}</Table.Cell>
      <Table.Cell>{taskItem.project}</Table.Cell>
    </>
  );
}
