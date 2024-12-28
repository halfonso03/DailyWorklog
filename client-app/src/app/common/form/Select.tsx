/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyntheticEvent, useEffect, useRef } from 'react';
import Option from './Option';

export interface DropdownProps {
  name: string;
  options: { value: string; text: string }[];
  label?: string;
  value?: string;
  onChange?: (e: SyntheticEvent<HTMLElement>) => void;
  onBlur?: (e: any) => void;
  disabled?: boolean;
  additionalclasses?: string;
  defaultoption?: { value: string; text: string };
  focus?: boolean;
}

export default function Select(props: DropdownProps) {
  const { options, defaultoption } = props;

  const ref = useRef<HTMLSelectElement | null>(null);

  if (defaultoption?.value) {
    if (!options.some((x) => x.value === '0')) {
      options.unshift(defaultoption);
    }
  }

  let classNames = `w-full outline-none bg-gray-50 border border-slate-700 text-gray-900 text-sm rounded-sm block p-2 dark:bg-transparent  dark:placeholder-gray-400 dark:text-white focus:border-blue-600`;

  if (props.additionalclasses) {
    classNames += ' ' + props.additionalclasses;
  }

  // this doesn't work
  useEffect(() => {
    if (props.focus) {
      ref.current!.focus();
    }
  }, [props.focus]);
  return (
    <select {...props} className={classNames} ref={ref}>
      {options.map((o) => (
        <Option key={o.value} text={o.text} value={o.value}></Option>
      ))}
    </select>
  );
}
