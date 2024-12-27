/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useRef, useState } from 'react';
import { Form, Formik } from 'formik';
import { DatePickerField } from '../app/common/form/DatepickerField';
import * as Yup from 'yup';
import { FaCheck } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa6';
import Textarea from '../app/common/form/Textarea';
import FormikSelect from '../app/common/form/FormikSelect';
import { useLogContext } from '../context/useLogContext';
import { TaskItem } from '../models/TaskItem';
import Modal, { ModalContext, ModalContextType } from '../pages/Modal';

import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';

interface Props {
  taskItem?: TaskItem;
  onAdded?: () => void;
}

const TaskItemForm = ({ taskItem, onAdded }: Props) => {
  // const params = useParams();
  const {
    projects,
    hidtas,
    createTask,
    setSelectedTask,
    updateTask,
    loadTasks,
  } = useLogContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const context = useContext<ModalContextType>(ModalContext as any);
  const [saveSuccessfull, setSaveSuccessFull] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  let initialValues: TaskItem = {
    id: 0,
    taskDate: new Date(),
    projectId: 0,
    hidtaId: 0,
    description: '',
  };

  if (taskItem) {
    initialValues = taskItem;
  }

  useEffect(() => {
    return () => setSelectedTask(undefined);
  }, [setSelectedTask]);

  const validationSchema = Yup.object({
    hidtaId: Yup.string().not(['0', 0, '']).required(),
    projectId: Yup.string().not(['0', 0, '']).required(),
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

  return (
    <div className="w-full my-6">
      <div className="w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              if (values.id !== 0) {
                updateTask(values);
              } else {
                createTask(values);
              }
              onAdded?.();
              setSaveSuccessFull(true);
              context.close();
            } catch (error) {
              console.log(error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, isValidating, handleSubmit, errors }) => (
            <>
              {/* <pre>{JSON.stringify(errors)}</pre> */}
              <Form onSubmit={handleSubmit}>
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
                    validationclasses="dark:border-red-600"
                  ></Textarea>
                </div>
                <div className="flex gap-3 justify-end m-1 my-4">
                  {/* <div>{isSubmitting}</div> */}
                  <button
                    type="submit"
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
                  <Modal.Close name={initialValues.id.toString()}>
                    <button
                      ref={ref}
                      type="button"
                      disabled={isSubmitting || saveSuccessfull}
                      className="w-3/12 min-h-0.5 p-1 border border-slate-400 rounded-sm font-semibold text-slate-200 hover:border-slate-200 bg-transparent opacity-90 disabled:opacity-70 "
                    >
                      Cancel
                    </button>
                  </Modal.Close>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TaskItemForm;
