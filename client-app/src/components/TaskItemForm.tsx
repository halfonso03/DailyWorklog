/* eslint-disable @typescript-eslint/no-unused-vars */
import Textarea from '../app/common/form/Textarea';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Formik } from 'formik';
import FormikSelect from '../app/common/form/FormikSelect';
import { FaSpinner } from 'react-icons/fa6';
import { DatePickerField } from '../app/common/form/DatepickerField';
import { useLogContext } from '../context/useLogContext';
import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import * as Yup from 'yup';
import { TaskItem, TaskItemFormValues } from '../models/TaskItem';
// import FormatDate from '../app/utils/formatDate';

// interface Props {
//   curDate?: Date | null;
// }

const TaskItemForm = () => {
  const { projects, hidtas, createTask, selectedTask, setSelectedTask } =
    useLogContext();
  const [saveSuccessfull, setSaveSuccessFull] = useState(false);

  let initialValues: TaskItem = {
    id: 0,
    taskDate: new Date(),
    projectId: 0,
    hidtaId: 0,
    description: '',
  };

  if (selectedTask) {
    initialValues = selectedTask;
    console.log('initialValues', initialValues);
  }
  // const initialValues = selectedTask ? selectedTask : new TaskItemFormValues();

  useEffect(() => {
    return () => setSelectedTask(undefined);
  }, [setSelectedTask]);

  const validationSchema = Yup.object({
    hidtaId: Yup.string().required(),
    projectId: Yup.string().required(),
    description: Yup.string().required(),
  });

  useEffect(() => {
    let timer: number | undefined;

    if (saveSuccessfull === true) {
      timer = setTimeout(() => {
        setSaveSuccessFull(false);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [saveSuccessfull]);

  // value={
  //   initialValues.taskDate
  //     ? FormatDate(initialValues.taskDate!)
  //     : FormatDate(new Date())
  // }

  return (
    <div className=" w-full my-6">
      <div className="w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              createTask(values);
              setSaveSuccessFull(true);
            } catch (error) {
              console.log(error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            handleSubmit,
            errors,
            isSubmitting,
            isValidating,
            setFieldValue,
            resetForm,
          }) => (
            <Form>
              {/* <pre>{JSON.stringify(errors)}</pre> */}
              {isValidating && <div>valifating</div>}
              <div className="flex justify-between m-1">
                <div className="text-gray-200 p-1 w-1/4">Date</div>
                <DatePickerField
                  name="taskDate"
                  initialValue={initialValues.taskDate}
                  disabled={isSubmitting}
                ></DatePickerField>
              </div>
              <div className="flex justify-between m-1">
                <div className="text-gray-200 p-1 w-1/4">HIDTA</div>
                <div className="w-3/4">
                  <FormikSelect
                    name="hidtaId"
                    value={initialValues.hidtaId.toString()}
                    additionalclasses="dark:border-red-600"
                    disabled={isSubmitting}
                    defaultoption={{ value: '0', text: 'Choose a HIDTA' }}
                    options={hidtas.map((p) => ({
                      value: p.id.toString(),
                      text: p.name,
                    }))}
                  ></FormikSelect>
                </div>
              </div>
              <div className="flex justify-between m-1">
                <div className="text-gray-200 p-1 w-1/4">Project</div>
                <div className="w-3/4">
                  <FormikSelect
                    name="projectId"
                    value={initialValues.projectId.toString()}
                    disabled={isSubmitting}
                    additionalclasses="dark:border-red-600"
                    defaultoption={{ value: '0', text: 'Choose a Project' }}
                    options={projects.map((p) => ({
                      value: p.id.toString(),
                      text: p.name,
                    }))}
                  ></FormikSelect>
                </div>
              </div>
              <div className="flex justify-between m-1">
                <div className="text-gray-200 p-1">Description</div>
                <Textarea
                  rows={3}
                  value={initialValues.description}
                  name="description"
                  disabled={isSubmitting}
                  validationclasses=" dark:border-red-600"
                ></Textarea>
              </div>
              <div className="flex gap-3 justify-end m-1 my-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-3/12 min-h-0.5 p-1 rounded-sm font-semibold text-black hover:text-black hover:bg-slate-100 bg-slate-200"
                >
                  {isSubmitting ? (
                    <div className="m-auto w-full flex justify-center ">
                      <FaSpinner className="w-5 h-5 spinner"></FaSpinner>
                    </div>
                  ) : saveSuccessfull ? (
                    <div className="m-auto w-full flex justify-center">
                      <FaCheck className="w-3 h-3"></FaCheck>
                    </div>
                  ) : (
                    <div className="m-auto w-full">Save</div>
                  )}
                </button>
                <button
                  type="button"
                  disabled={isSubmitting || saveSuccessfull}
                  onClick={() => resetForm()}
                  className="w-3/12 min-h-0.5 p-1 border border-slate-600 rounded-sm font-semibold text-slate-200 hover:border-slate-200 bg-transparent opacity-90 disabled:opacity-70 "
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TaskItemForm;
