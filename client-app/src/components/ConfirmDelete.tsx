import FormatDate from '../app/utils/formatDate';
import { TaskItem } from '../models/TaskItem';
import { FaExclamationTriangle } from 'react-icons/fa';
import Modal, { ModalContext, ModalContextType } from '../pages/Modal';
import { useLogContext } from '../context/useLogContext';
import { useContext } from 'react';
import { FaSpinner } from 'react-icons/fa6';

interface Props {
  taskItem: TaskItem;
}
export default function ConfirmDelete({ taskItem }: Props) {
  const { isDeleting, deleteTask } = useLogContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const context = useContext<ModalContextType>(ModalContext as any);

  async function handleDelete() {
    await deleteTask(taskItem.id);
    context.close();
  }

  return (
    <div className="flex flex-col">
      <div className="flex align-baseline gap-3 mb-4">
        <FaExclamationTriangle className="text-yellow-500 text-2xl"></FaExclamationTriangle>
        <div className="font-semibold text-xl">
          Click OK to delete the task:
        </div>
      </div>
      <div className="grid grid-cols-2 p-3">
        <div>Date:</div>
        <div>{FormatDate(taskItem!.taskDate!)}</div>
        <div>Description:</div>
        <div>{taskItem.description}</div>
        <div>HIDTA:</div>
        <div>{taskItem.hidta}</div>
        <div>Project:</div>
        <div>{taskItem.project}</div>
      </div>
      <div className="flex justify-end gap-2 mt-4 mb-2">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="min-h-0.5 w-1/4 px-5 py-3 rounded-sm font-semibold text-white hover:text-white hover:bg-red-600 bg-red-700"
        >
          {isDeleting ? (
            <div className="m-auto w-full flex justify-center ">
              <FaSpinner className="w-5 h-5 spinner"></FaSpinner>
            </div>
          ) : (
            <div>Delete</div>
          )}
        </button>

        <Modal.Close name={taskItem.id.toString() + '_delete'}>
          <button
            type="button"
            disabled={isDeleting}
            className="w-3/12 min-h-0.5 p-1 border border-slate-400 rounded-sm font-semibold text-slate-200 hover:border-slate-200 bg-transparent opacity-90 disabled:opacity-70 "
          >
            Cancel
          </button>
        </Modal.Close>
      </div>
    </div>
  );
}
