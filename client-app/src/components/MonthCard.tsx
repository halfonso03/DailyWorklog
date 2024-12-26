import { Link } from 'react-router-dom';
import { MonthName } from '../app/utils/formatDate';

interface Props {
  monthName: string;
  monthIndex: number;
  itemCount: number;
  year: number;
}

export default function MonthCard({
  monthIndex,
  monthName,
  itemCount,
  year,
}: Props) {
  const currentMonthName = MonthName(new Date());

  return (
    <Link
      to={`/tasks/${year}/${monthIndex}`}
      className="cursor-pointer relative w-[24%] mb-2"
    >
      <div>
        {currentMonthName === monthName && (
          <div
            className="absolute bg-slate-400 top-0 left-0 w-full rounded-t-sm"
            style={{ minHeight: '.5rem' }}
          ></div>
        )}

        <div
          className={`flex justify-between border border-slate-700 rounded-sm w-full p-4 hover:transition-all duration-300 hover:bg-slate-800 ${
            currentMonthName == monthName ? 'border-slate-400' : ''
          }`}
        >
          <div
            className={currentMonthName === monthName ? 'font-semibold' : ''}
          >
            {monthName}
          </div>
          <div
            className={currentMonthName === monthName ? 'font-semibold' : ''}
          >
            {itemCount}
          </div>
        </div>
      </div>
    </Link>
  );
}
