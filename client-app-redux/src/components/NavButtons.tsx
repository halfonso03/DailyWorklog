import { Link } from 'react-router-dom';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

interface Props {
  currentDate: string;
}

export default function NavButtons({ currentDate }: Props) {
  const date = new Date(currentDate);
  const curM = date.getMonth() + 1;
  const currMonth = date.getMonth();
  const prevYear =
    currMonth === 0 ? date.getFullYear() - 1 : date.getFullYear();
  
  const nextMonthNav = curM === 12 ? 1 : curM + 1;
  const prevMonthNav = curM === 1 ? 12 : curM - 1;
  const nextYear =
    date.getMonth() === 11 ? date.getFullYear() + 1 : date.getFullYear();

  return (
    <div className="w-full flex justify-end gap-2">
      <Link to={`/tasks/${prevYear}/${prevMonthNav}`}>
        <div className="flex align-middle gap-1 text-slate-300">
          <div className="p-1 text-xl">
            <FaArrowLeftLong></FaArrowLeftLong>
          </div>
        </div>
      </Link>      
      <Link to={`/tasks/${nextYear}/${nextMonthNav}`}>
        <div className="flex align-middle gap-1 text-slate-300">
          <div className="p-1 text-xl">
            <FaArrowRightLong></FaArrowRightLong>
          </div>
        </div>
      </Link>
    </div>
  );
}
