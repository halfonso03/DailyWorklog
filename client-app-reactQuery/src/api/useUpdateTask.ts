
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskItem, TaskItemFormValues } from "../models/TaskItem";
import agent from "./agent";

export function useUpdateTask() {
    const queryClient = useQueryClient();

    const { mutate: updateTask, isPending: isUpdating, isSuccess: updated } = useMutation({
        mutationFn: (taskItem: TaskItemFormValues) => _updateTask(taskItem),
        onSuccess: (updatedTask: TaskItem | null) => {

            if (updatedTask) {
                const date = updatedTask.taskDate;
                const month = date!.getMonth() + 1;
                const year = date?.getFullYear();
                queryClient.invalidateQueries({ queryKey: [`tasks${year}${month}`] });
                
                return updatedTask;
            }
        }
    });

    return { isUpdating, updated, updateTask };
}


async function _updateTask(values: TaskItemFormValues) {
    try {
        if (values.requestorId <= -1) {
            values.requestorId = 0;
        }

        const updatedTask = {
            ...values,
            hidtaId: +values.hidtaId,
            projectId: +values.projectId,
        };

        const response = await agent.TaskItems.update(updatedTask);

        const newTask: TaskItem = {
            ...values,
            id: response.id,
            requestorId: response.requestorId,
            requestorName: response.requestorName,
        };

        return newTask;

        //   const existingTasks = [...tasks.filter((t) => t.id !== values.id)];
        //   existingTasks.push(taskItem);
        //   sortTasks(existingTasks);
    } catch (error) {
        console.log(error);
    }

    return null;
}
