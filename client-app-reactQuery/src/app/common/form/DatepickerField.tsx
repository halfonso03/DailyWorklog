/* eslint-disable @typescript-eslint/no-explicit-any */
import { useField } from 'formik';
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';

interface Props {
  props?: any;
  name: string;
  disabled: boolean;
  initialValue: Date | null;
  onChange: (newDate: Date | null) => void;
}

export const DatePickerField = ({
  name,
  disabled,
  initialValue,
  props,
  onChange,
}: Props) => {
  // const { setFieldValue } = useFormikContext();
  const [field, , { setValue }] = useField(name);

  useEffect(() => {
    if (initialValue) {
      setValue(new Date(initialValue));
    }
  }, [initialValue, setValue]);

  return (
    <DatePicker
      {...field}
      {...props}
      disabled={disabled}
      selected={field.value}
      onChange={(val) => {
        setValue(val);
        onChange(val);
      }}
      className="w-full outline-none rounded-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm block p-2 dark:bg-transparent dark:border-slate-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      wrapperClassName="w-3/4 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
  );
};
