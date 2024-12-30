import { useParams } from 'react-router-dom';
import TaskList from '../components/TaskList';
import { MonthNameFromDate } from '../app/utils/formatDate';

function Tasks() {
  const params = useParams();

  const month = params.month;
  const year = params.year;

  const monthName = MonthNameFromDate(new Date(`${month}/1/${year}`));

  return (
    <>
      {' '}
      <div className="flex flex-col my-8  ">
        <div className="mb-4 font-semibold text-3xl opacity-95 border-b border-slate-700 py-2">
          {monthName} {year}
        </div>
        <TaskList
          key={params!.year!.toString() + params!.month!.toString()}
        ></TaskList>
      </div>
    </>
  );
}

{
  /* <TaskItemForm ></TaskItemForm> */
}

export default Tasks;
