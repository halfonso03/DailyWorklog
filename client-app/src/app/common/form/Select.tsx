import { ChangeEvent } from 'react';
import Option from './Option';

interface Props {
  name: string;
  options: string[];
  defaultOption?: string;
  selectedValue?: string;
  tabindex?: number;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void | null;
}

export default function Select({
  name,
  options,
  defaultOption,
  tabindex,
  onChange,
}: Props) {
  return (
    <select
      name={name}
      tabIndex={tabindex}
      id={name}
      onChange={onChange}
      defaultValue={defaultOption}
      className="w-full outline-none bg-gray-50 border border-slate-700 text-gray-900 text-sm rounded-md block p-2 dark:bg-transparent dark:border-slate-700 dark:placeholder-gray-400 dark:text-white"
    >
      {options.map((o) => (
        <Option value={o} text={o} key={o}></Option>
      ))}
    </select>
  );
}
