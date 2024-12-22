import { useState } from 'react';
import Select from '../app/common/form/Select';
import Textarea from '../app/common/form/Textarea';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function TaskItemForm() {
  //function getCurrentDate() {}

  const [taskDate, setTaskDate] = useState<Date | null>(new Date());

  return (
    <div className="m-5">
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col  gap-5">
          <div className="flex justify-between">
            <div className="text-gray-300 p-1 w-1/4">Date</div>
            <DatePicker
              wrapperClassName="w-3/4 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              selected={taskDate}
              onChange={(date) => setTaskDate(date)}
              onSelect={(date) => setTaskDate(date)}
              className="w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></DatePicker>
            {/* <Input name="date" tabindex={1} value={}></Input> */}
          </div>
          <div className="flex justify-between">
            <div className="text-gray-300 p-1">HIDTA</div>
            <Select
              name="HIDTA"
              tabindex={2}
              defaultOption="Choose a HIDTA"
              options={['US', 'Canada', 'Germany']}
            ></Select>
          </div>
          <div className="flex justify-between">
            <div className="text-gray-300 p-1">Project</div>
            <Select
              name="Project"
              tabindex={3}
              defaultOption="Choose a project"
              options={['FMS', 'HOTT']}
            ></Select>
          </div>
          <div className="flex justify-between">
            <div className="text-gray-300 p-1">Description</div>
            <Textarea rows={3} name="description"></Textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className=" border rounded-md font-semibold text-black hover:bg-slate-100 bg-slate-200 py-2 px-4"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
