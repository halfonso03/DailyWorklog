import { ChangeEvent, useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { DatePickerField } from '../app/common/form/DatepickerField';
import * as Yup from 'yup';
import { FaCheck } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa6';
import Textarea from '../app/common/form/Textarea';
import FormikSelect from '../app/common/form/FormikSelect';
import { TaskItem, TaskItemFormValues } from '../models/TaskItem';
import Modal, { useModalContext } from '../pages/Modal';
import { HelperOptions } from '../app/utils/helperOptions';
import 'react-datepicker/dist/react-datepicker.css';
import HelperTags from './HelperTags';
import { Hidta } from '../models/Hidta';
import { Project } from '../models/Project';
import { useHidtas } from '../api/useHidtas';
import { useRequestors } from '../api/useRequestors';
import { useProjects } from '../api/useProjects';
import { useCreateTask } from '../api/useCreateTask';
import { useUpdateTask } from '../api/useUpdateTask';

interface Props {
  taskItem?: TaskItem;
  onAdded?: () => void;
  defaultDate?: Date | null;
}

const TaskItemForm = ({ taskItem, onAdded, defaultDate }: Props) => {
  const context = useModalContext();
  const [hidtaId, setHidtaId] = useState(() => {
    if (taskItem) return taskItem.hidtaId;
    return 0;
  });
  const [newRequestor, setNewRequestor] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    taskItem ? taskItem.taskDate : defaultDate ? defaultDate : new Date()
  );
  const [showCheck, setShowCheck] = useState(false);

  const { hidtas, loadingHidtas } = useHidtas();
  const { requestors, loadingRequestors } = useRequestors(hidtaId);
  const { projects, loadingProjects } = useProjects();
  const { isCreating, created, createTask } = useCreateTask();
  const { isUpdating, updated, updateTask } = useUpdateTask();

  const updatedRequestors = requestors
    ? [
        { value: '-1', text: 'Add Requestor' },
        ...(requestors as { value: string; text: string }[]),
      ]
    : [];

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

  async function handleLoadRequestors(id: number) {
    setHidtaId(id);
  }

  useEffect(() => {
    let timer2: number | undefined;
    if (created || updated) {
      timer2 = setTimeout(() => {
        setShowCheck(false);
        context.close();
      }, 700);
    }
    return () => clearTimeout(timer2);
  }, [created, updated, showCheck, context]);

  function handleDateChange(d: Date | null) {
    setSelectedDate(d);
  }

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
          }) => (
            <>
              {/* <pre>{JSON.stringify(errors)}</pre> */}
              <Form onSubmit={handleSubmit}>
                {isValidating && <div>valifating</div>}
                <div className="flex justify-between m-1">
                  <div className="text-gray-200 p-1 w-1/4">Date</div>
                  <DatePickerField
                    name="taskDate"
                    initialValue={selectedDate}
                    disabled={isSubmitting}
                    onChange={handleDateChange}
                  ></DatePickerField>
                </div>
                <div className="flex justify-between m-1">
                  <div className="text-gray-200 p-1 w-1/4">HIDTA</div>
                  <div className="w-3/4 flex">
                    {/* {selectedTask && <pre>{JSON.stringify(selectedTask)}</pre>} */}

                    {loadingHidtas ? (
                      <div className="py-2 flex">
                        <FaSpinner
                          className="spinner self-center "
                          style={{ marginTop: '4px', marginBottom: '4px' }}
                        ></FaSpinner>
                      </div>
                    ) : (
                      <FormikSelect
                        name="hidtaId"
                        focus={true}
                        value={initialValues.hidtaId.toString()}
                        additionalclasses="dark:border-red-600"
                        disabled={isSubmitting}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                          setFieldValue('hidtaId', e.target.value);
                          setFieldValue('requestorId', 0);
                          handleLoadRequestors(+e.target.value);
                        }}
                        defaultoption={{ value: '0', text: 'Choose a HIDTA' }}
                        options={hidtas!.map((p: Hidta) => ({
                          value: p.id.toString(),
                          text: p.name,
                        }))}
                      ></FormikSelect>
                    )}
                  </div>
                </div>
                <div className="flex justify-between m-1">
                  <div className="text-gray-200 p-1 w-1/4">Project</div>
                  <div className="w-3/4">
                    {loadingProjects ? (
                      <div className="py-2 flex">
                        <FaSpinner
                          className="spinner self-center"
                          style={{ marginTop: '4px', marginBottom: '4px' }}
                        ></FaSpinner>
                      </div>
                    ) : (
                      <FormikSelect
                        name="projectId"
                        value={initialValues.projectId.toString()}
                        disabled={isSubmitting}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                          setFieldValue('projectId', e.target.value);
                        }}
                        additionalclasses="dark:border-red-600"
                        defaultoption={{ value: '0', text: 'Choose a Project' }}
                        options={projects!.map((p: Project) => ({
                          value: p.id.toString(),
                          text: p.name,
                        }))}
                      ></FormikSelect>
                    )}
                  </div>
                </div>
                <div className="flex justify-between m-1">
                  <div className="text-gray-200 p-1 w-1/4">Requestor</div>
                  <div className="w-3/4">
                    <div className="w-full">
                      {loadingRequestors ? (
                        <div className="py-2 flex">
                          <FaSpinner
                            className="spinner self-center"
                            style={{ marginTop: '4px', marginBottom: '4px' }}
                          ></FaSpinner>
                        </div>
                      ) : (
                        <FormikSelect
                          name="requestorId"
                          value={initialValues.requestorId.toString()}
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
                          options={
                            requestors
                              ? updatedRequestors!.map((p) => ({
                                  value: p.value.toString(),
                                  text: p.text,
                                }))
                              : []
                          }
                        ></FormikSelect>
                      )}
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
                    rows={2}
                    value={initialValues.description}
                    name="description"
                    disabled={isSubmitting}
                    validationclasses="dark:border-red-600"
                  ></Textarea>
                </div>
                <div>
                  <HelperTags
                    helperTags={HelperOptions}
                    onHelperClick={(key: string) =>
                      setFieldValue(
                        'description',
                        HelperOptions.find((x) => x.key === key)?.value
                      )
                    }
                  ></HelperTags>
                </div>
                <div className="flex gap-3 justify-end m-1 my-4">
                  {/* <div>{isSubmitting}</div> */}
                  <button
                    type="submit"
                    className="w-3/12 min-h-0.5 p-1 rounded-sm font-semibold text-black hover:text-black hover:bg-slate-100 bg-slate-200"
                  >
                    {isCreating || isUpdating ? (
                      <div className="m-auto w-full flex justify-center ">
                        <FaSpinner className="w-5 h-5 spinner"></FaSpinner>
                      </div>
                    ) : created || updated ? (
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
                      disabled={isCreating}
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
