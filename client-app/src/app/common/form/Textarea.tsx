// import { useField } from 'formik';
// import { Form, Label } from 'semantic-ui-react';

interface Props {
  placeholder?: string;
  name: string;
  rows: number;
}

export default function Textarea(props: Props) {
  //   const [field, meta] = useField(props.name);

  return (
    <textarea
      {...props}
      className="w-3/4 bg-gray-50 border  outline-none border-gray-100 text-gray-900 text-sm rounded-sm block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
    />

    // <Form.Field error={meta.touched && !!meta.error}>
    //   <label>{props.label}</label>

    //   {meta.touched && meta.error ? (
    //     <Label basic color="red" style={{marginTop: '2px'}}>
    //       {meta.error}
    //     </Label>
    //   ) : null}
    // </Form.Field>
  );
}
