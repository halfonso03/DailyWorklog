import { SyntheticEvent, useState } from 'react';
import Select from '../app/common/form/Select';
import MonthCard from '../components/MonthCard';
import agent from '../api/agent';
import { useQuery } from '@tanstack/react-query';
import { FaSpinner } from 'react-icons/fa6';

const years = ['2025', '2024'];

export default function Dashboard() {
  const [year, setYear] = useState<string>('2025');

  function handleChange(e: SyntheticEvent<HTMLElement>) {
    setYear((e.target as HTMLSelectElement).value);
  }
  
  const { data: months, isLoading } = useQuery({
    queryKey: [`monthlySummary${year}`],
    queryFn: () => agent.TaskItems.summary(+year),
  });

  
  if (isLoading)
    return (
      <div className="m-auto w-full flex justify-center my-8 ">
        <FaSpinner className="w-5 h-5 spinner"></FaSpinner>
      </div>
    );

  return (
    <>
      <div className="text-white my-4">
        <div className="m-auto w-3/4">
          <div className="w-[24%]">
            <Select
              onChange={handleChange}
              value={year}
              name="year"
              options={years.map((year) => ({ value: year, text: year }))}
            ></Select>
          </div>
        </div>
      </div>

      <div className="w-3/4 m-auto">
        <div className="flex flex-wrap  justify-between text-white ">
          {months!.map((month) => (
            <MonthCard
              year={+year}
              key={month.monthIndex}
              monthIndex={month.monthIndex}
              monthName={month.monthName}
              itemCount={month.taskItemCount}
            ></MonthCard>
          ))}
        </div>
      </div>
    </>
  );
}
