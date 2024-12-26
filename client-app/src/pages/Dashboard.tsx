import { SyntheticEvent, useEffect, useState } from 'react';
import Select from '../app/common/form/Select';
import MonthCard from '../components/MonthCard';
import agent from '../api/agent';
import { MonthlySummaryItem } from '../models/MonthlySummaryItem';

export default function Dashboard() {
  const [year, setYear] = useState<string>('2024');
  const years = ['2024', '2023'];
  const [months, setMonths] = useState<MonthlySummaryItem[]>([]);

  function handleChange(e: SyntheticEvent<HTMLElement>) {
    setYear((e.target as HTMLSelectElement).value);
  }

  useEffect(() => {
    async function t() {
      try {
        const response = await agent.TaskItems.summary(+year);
        setMonths(response);
      } catch (error) {
        console.log('error', error);
      }
    }
    t();
  }, [year]);

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
          {months.map((month) => (
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
