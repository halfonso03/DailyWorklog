import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskItem, TaskItemFormValues } from "../models/TaskItem";
import agent from "./agent";
// import { Hidta } from "../models/Hidta";
// import { Project } from "../models/Project";

export function useCreateTask() {
    const queryClient = useQueryClient();

    const { mutate: createTask, isPending: isCreating, isSuccess: created } = useMutation({
        mutationFn: (taskItem: TaskItemFormValues) => _createTask(taskItem),
        onSuccess: (newTask: TaskItem) => {


            const date = newTask.taskDate;
            const month = date!.getMonth() + 1;
            const year = date?.getFullYear();

            queryClient.invalidateQueries({ queryKey: [`tasks${year}${month}`] });

            // const hidtas = queryClient.getQueryData<Hidta[]>(['hidtas'])
            // const projects = queryClient.getQueryData<Project[]>(['projects']);


            // newTask = {
            //     ...newTask,
            //     hidta: hidtas!.find((x) => x.id === newTask.hidtaId)?.name,
            //     project: projects!.find((x) => x.id == newTask.projectId)?.name,
            // };

        }

    });

    return { isCreating, created, createTask };
}


async function _createTask(values: TaskItemFormValues) {


    const shapedTask =
        values.requestorName?.trim() !== ''
            ? {
                ...values,
                requestorName: '',
                requestor: {
                    firstName: values.requestorName?.split(' ')[0],
                    lastName: values.requestorName?.split(' ')[1],
                    email: values.requestorEmail,
                },
            }
            : {
                ...values,
                requestorName: '',
            };

    const response = await agent.TaskItems.create(shapedTask);

    const newTask: TaskItem = {
        ...values,
        id: response.id,
        requestorId: response.requestorId,
        requestorName: response.requestorName,
    };

    return newTask;


    //sortTasks([...tasks, newTask]);
}