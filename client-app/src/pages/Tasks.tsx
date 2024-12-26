import { useParams } from 'react-router-dom';
import TaskItemForm from '../components/TaskItemForm';
import TaskList from '../components/TaskList';


function Tasks() {
  const params = useParams();

  // const [curDate, setCurDate] = useState(null);


  return (
    <div className="grid grid-cols-3 gap-10 my-8 ">
      <TaskItemForm ></TaskItemForm>
      <div className="col-span-2">
        <TaskList
          key={params!.year!.toString() + params!.month!.toString()}
        ></TaskList>
      </div>
    </div>
  );
}

export default Tasks;
