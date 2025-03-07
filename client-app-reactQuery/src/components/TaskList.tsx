import { useParams } from 'react-router-dom';
import { TaskItem, TaskItemFormValues } from '../models/TaskItem';
import Table from '../app/common/ui/Table';
import TaskItemRow from './TaskItemRow';
import Modal from '../pages/Modal';
import TaskItemForm from './TaskItemForm';
import NavButtons from './NavButtons';
import { FaSpinner } from 'react-icons/fa6';
import { useTasks } from '../api/useTasks';
import SortBySelector from './SortBySelector';
import { useState } from 'react';

export default function TaskList() {
  const [sortbyValue, setSortbyValue] = useState('date');
  const params = useParams();
  const month = params!.month!;
  const year = params!.year!;
  const defaultDate = new Date();

  const { tasks, isLoading } = useTasks(year, month, sortbyValue);

  console.log('sortbyValue',sortbyValue)

  // function getDistinctHidtas(tasks: TaskItem[] | undefined) {
  //   if (!tasks) return null;

  //   const hidtas = tasks?.map((x) => x.hidta).sort() as string[];
  //   const distinctHidtas = getDistinct(hidtas).reduce(
  //     (acc, curr) => acc + curr + ', ',
  //     ''
  //   );

  //   return distinctHidtas.substring(0, distinctHidtas.length - 2);
  // }

  // function getDistinct(items: string[] | undefined) {
  //   const distinctItems = [];
  //   for (const item of items!) {
  //     if (distinctItems.indexOf(item) === -1) distinctItems.push(item);
  //   }
  //   return distinctItems;
  // }

  if (isLoading)
    return (
      <div className="m-auto w-full flex justify-center my-8 ">
        <FaSpinner className="w-5 h-5 spinner"></FaSpinner>
      </div>
    );
  return (
    <>
      <div className="w-full">
        {/* <div className="mb-3">{getDistinctHidtas(tasks)}</div> */}
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
              <TaskItemForm defaultDate={defaultDate} sortbyValue={sortbyValue}></TaskItemForm>
            </Modal.Window>
          </Modal>
          <Modal>
            <NavButtons currentDate={`${month}/1/${year}`}></NavButtons>
            <Table columns=".35fr .5fr 1fr .8fr .8fr 1fr">
              <Table.Header>
                <Table.Cell></Table.Cell>
                <Table.Cell>
                  <SortBySelector
                    label="DATE"
                    value="date"
                    currentSortValue={sortbyValue}
                    setSortbyValue={setSortbyValue}
                  ></SortBySelector>
                </Table.Cell>
                <Table.Cell>
                  <SortBySelector
                    label="Description"
                    value="desc"
                    currentSortValue={sortbyValue}
                    setSortbyValue={setSortbyValue}
                  ></SortBySelector>
                </Table.Cell>
                <Table.Cell>
                  <SortBySelector
                    label="HIDTA"
                    value="hidta"
                    currentSortValue={sortbyValue}
                    setSortbyValue={setSortbyValue}
                  ></SortBySelector>
                </Table.Cell>
                <Table.Cell>
                  <SortBySelector
                    label="Project"
                    value="project"
                    currentSortValue={sortbyValue}
                    setSortbyValue={setSortbyValue}
                  ></SortBySelector>
                </Table.Cell>
                <Table.Cell>
                  <SortBySelector
                    label="Requestor"
                    value="requestor"
                    currentSortValue={sortbyValue}
                    setSortbyValue={setSortbyValue}
                  ></SortBySelector>
                </Table.Cell>
              </Table.Header>
              <Table.Body
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data={tasks as any[]}
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
