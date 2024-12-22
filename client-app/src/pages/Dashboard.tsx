import { ChangeEvent, useEffect, useState } from 'react';
import Select from '../app/common/form/Select';
import MonthCard from '../components/MonthCard';

export default function Dashboard() {
  const [year, setYear] = useState<string>('');
  const years = ['2024', '2023'];
  const [months, setMonths] = useState<string[]>([]);

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setYear(e.target.value);
  }

  function getMonths() {
    const monthNames = [];
    for (let m = 0; m <= 11; m++) {
      const newD = new Intl.DateTimeFormat('en-US', {
        month: 'long',
      }).format(new Date().setMonth(m));
      monthNames.push(newD);
    }
    setMonths(monthNames);
  }

  useEffect(() => {
    getMonths();
  }, []);

  return (
    <>
      <div className="text-white my-4">
        <div className="m-auto w-4/5">
          <div className="w-full">
            <div className="w-1/4">
              <Select
                onChange={handleChange}
                selectedValue={year}
                name="year"
                options={years}
                defaultOption={years[0]}
              ></Select>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full m-auto">
        <div className="flex flex-wrap gap-1 justify-center text-white ">
          {months.map((month) => (
            <MonthCard key={month} month={month} items={3}></MonthCard>
          ))}
        </div>
      </div>
    </>
  );
}
