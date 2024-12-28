import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { DatePickerField } from '../app/common/form/DatepickerField';
import * as Yup from 'yup';
import { FaCheck } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa6';
import Textarea from '../app/common/form/Textarea';
import FormikSelect from '../app/common/form/FormikSelect';
import { useLogContext } from '../context/useLogContext';
import { TaskItem, TaskItemFormValues } from '../models/TaskItem';
import Modal, { ModalContext, ModalContextType } from '../pages/Modal';

import 'react-datepicker/dist/react-datepicker.css';
import { Requestor } from '../models/Requestor';
import agent from '../api/agent';

interface Props {
  taskItem?: TaskItem;
  onAdded?: () => void;
}

const TaskItemForm = ({ taskItem, onAdded }: Props) => {
  const { projects, hidtas, createTask, setSelectedTask, updateTask } =
    useLogContext();

  const [newRequestor, setNewRequestor] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const context = useContext<ModalContextType>(ModalContext as any);
  const [saveSuccessfull, setSaveSuccessFull] = useState(false);
  const [requestors, setRequestors] = useState<
    { value: string; text: string }[]
  >([]);

  let initialValues: TaskItemFormValues = {
    id: 0,
    taskDate: new Date(),
    projectId: 0,
    hidtaId: 0,
    requestorId: 0,
    description: '',
    requestorName: '',
    requestorEmail: '',
  };

  if (taskItem) {
    initialValues = { ...taskItem, requestorEmail: '', requestorName: '' };
  }

  const validationSchema = Yup.object().shape({
    hidtaId: Yup.string().not(['0', 0, '']).required(),
    projectId: Yup.string().not(['0', 0, '']).required(),
    description: Yup.string().required(),
    requestorId: Yup.string().not(['0', 0, '']).required(),
    requestorName: Yup.string().when('requestorId', {
      is: '-1', // alternatively: (val) => val == true
      then: (schema) => schema.required(),
      otherwise: () => Yup.string(),
    }),
    requestorEmail: Yup.string().when('requestorId', {
      is: '-1', // alternatively: (val) => val == true
      then: (schema) => schema.required(),
      otherwise: () => Yup.string(),
    }),
  });

  async function handleLoadRequestors(hidtaId: number) {
    agent.Requestors.get(hidtaId).then((response) => {
      const req = response.map((r) => ({
        value: r.id.toString(),
        text: `${r.firstName}  ${r.lastName} (${r.email})`,
      }));

      setRequestors([{ value: '-1', text: 'Add Requestor' }, ...req]);
    });

    // setRequestors((prev) => [
    //   ...response,
    //   { value: '-1', text: 'Add Requestor ', email: '' },
    // ]);

    // console.log(response);
  }

  useEffect(() => {
    let timer: number | undefined;

    if (saveSuccessfull === true) {
      timer = setTimeout(() => {
        setSaveSuccessFull(false);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [saveSuccessfull]);

  useEffect(() => {
    return () => setSelectedTask(undefined);
  }, [setSelectedTask]);

  return (
    <div className="w-full my-6">
      <div className="w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              console.log(values);
              if (values.id !== 0) {
                // updateTask(values);
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
          {({
            isSubmitting,
            isValidating,
            handleSubmit,
            setFieldValue,
            errors,
            touched,
            resetForm,
          }) => (
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
                      focus={true}
                      value={initialValues.hidtaId.toString()}
                      additionalclasses="dark:border-red-600"
                      disabled={isSubmitting}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setFieldValue('hidtaId', e.target.value);
                        handleLoadRequestors(+e.target.value);
                      }}
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
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setFieldValue('projectId', e.target.value);
                      }}
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
                  <div className="text-gray-200 p-1 w-1/4">Requestor</div>
                  <div className="w-3/4">
                    <div className="w-full">
                      <FormikSelect
                        name="requestorId"
                        value={initialValues.projectId.toString()}
                        disabled={isSubmitting}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                          setFieldValue('requestorId', e.target.value);
                          setNewRequestor(+e.target.value === -1);
                        }}
                        additionalclasses="dark:border-red-600"
                        defaultoption={{
                          value: '0',
                          text: 'Choose a Requestor',
                        }}
                        options={requestors.map((p) => ({
                          value: p.value.toString(),
                          text: p.text,
                        }))}
                      ></FormikSelect>
                    </div>
                    {newRequestor && (
                      <div className="flex py-4 pb-8 gap-3 ml-4">
                        <div>
                          <div>Requestor Name</div>
                          <div>
                            <Field
                              type="text"
                              name="requestorName"
                              className="w-full bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-slate-950  dark:placeholder-gray-400 dark:text-white focus:border-blue-600 dark:border-slate-700"
                            />
                            {errors.requestorName && touched.requestorName && (
                              <div className="font-semibold text-red-500 text-sm">
                                * Required
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div>Email</div>
                          <div>
                            <Field
                              type="text"
                              name="requestorEmail"
                              className="w-full bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-slate-950  dark:placeholder-gray-400 dark:text-white focus:border-blue-600 dark:border-slate-700"
                            />
                            {errors.requestorEmail &&
                              touched.requestorEmail && (
                                <div className="font-semibold text-red-500 text-sm">
                                  * Required
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    )}
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
