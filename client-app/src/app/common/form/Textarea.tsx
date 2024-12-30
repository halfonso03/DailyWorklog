// import { useField } from 'formik';
// import { Form, Label } from 'semantic-ui-react';

import { useField } from 'formik';
import { useEffect } from 'react';

interface Props {
  name: string;
  value: string | null;
  placeholder?: string;
  rows: number;
  disabled: boolean;
  validationclasses?: string;
}

export default function Textarea(props: Props) {
  const [field, meta, { setValue }] = useField(props.name);

  let classes =
    'w-3/4 bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-slate-950  dark:placeholder-gray-400 dark:text-white focus:border-blue-600';

  if (meta.touched && meta.error) {
    classes += ` ${props.validationclasses}`;
  } else {
    classes += ' dark:border-slate-700';
  }

  useEffect(() => {
    setValue(props.value);
  }, [props.value, setValue]);

  return (
    <>
      <textarea {...props} {...field} className={classes} />
      {/* {meta.touched && meta.error ? (
        <label color="red" style={{ marginTop: '2px' }}>
          {meta.error}
        </label>
      ) : null} */}
    </>

    // <Form.Field error={meta.touched && !!meta.error}>
    //   <label>{props.label}</label>

    // </Form.Field>
  );
}
