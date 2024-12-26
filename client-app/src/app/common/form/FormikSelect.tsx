import { useField } from 'formik';
import Select, { DropdownProps } from './Select';
import { useEffect } from 'react';

export default function FormikSelect(props: DropdownProps) {
  const { name, options, onBlur, defaultoption, disabled, additionalclasses } =
    props;
  const [field, meta, { setValue }] = useField(props);

  let classes = '';

  if (meta.touched && meta.error) {
    classes = ` ${additionalclasses}`;
  }

  useEffect(() => {
    setValue(props.value);
  }, [props.value, setValue]);

  return (
    <>
      <Select
        name={name}
        value={field.value}
        options={options}
        disabled={disabled}
        additionalclasses={classes}
        defaultoption={defaultoption}
        onChange={(e) => {
          setValue((e.target as HTMLSelectElement).value);
        }}
        onBlur={onBlur}
      ></Select>
      {/* {meta.touched && meta.error ? (
        <label className="mt-1">{meta.error}</label>
      ) : null} */}
    </>
  );
}
