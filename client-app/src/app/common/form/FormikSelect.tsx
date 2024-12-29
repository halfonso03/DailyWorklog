import { ChangeEvent, SyntheticEvent, useEffect, useRef } from 'react';
import { useField } from 'formik';

export interface DropdownProps2 {
  name: string;
  options: { value: string; text: string }[];
  label?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void | undefined;
  onBlur?: (e: SyntheticEvent<HTMLElement>) => void;
  disabled?: boolean;
  additionalclasses?: string;
  defaultoption?: { value: string; text: string };
  focus?: boolean;
}

export default function FormikSelect(props: DropdownProps2) {
  const {
    name,
    options,
    onBlur,
    defaultoption,
    disabled,
    additionalclasses,
    onChange,
  } = props;
  const [field, meta, { setValue }] = useField(props);
  const ref = useRef<HTMLSelectElement | null>(null);

  let classNames = `w-full outline-none bg-gray-50 border border-slate-700 text-gray-900 text-sm rounded-sm block p-2 dark:bg-transparent  dark:placeholder-gray-400 dark:text-white focus:border-blue-600`;

  if (meta.touched && meta.error) {
    classNames += ` ${additionalclasses}`;
  }

  if (defaultoption?.value) {
    if (!options.some((x) => x.value === '0')) {
      options.unshift(defaultoption);
    }
  }

  useEffect(() => {
    setValue(props.value);
  }, [props.value, setValue]);

  return (
    <>
      <select
        name={name}
        value={field.value}
        disabled={disabled}
        ref={ref}
        className={classNames}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map((o) => {
          let className = 'bg-slate-900 text-white';
          if (+o.value === -1) {
            className = ' bg-slate-700 italic opacity-90 text-slate-100 py-6';
          }
          return (
            <option key={o.value} value={o.value} className={className}>
              {o.text}
            </option>
          );
        })}
      </select>
    </>
  );
}
