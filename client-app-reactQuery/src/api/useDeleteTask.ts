import { useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "./agent";

export function useDeleteTask() {
    const queryClient = useQueryClient();

    const { mutate: deleteTask, isPending: isDeleting, isSuccess: deleted } = useMutation({
        mutationFn: ({ id, month, year }: { id: number, month: number, year: number }) => _deleteTask(id, month, year),
        onSuccess: ({ month, year }: { month: number, year: number }) => {
            queryClient.invalidateQueries({ queryKey: [`tasks${year}${month}`] });
        }
    });

    return { isDeleting, deleted, deleteTask };
}


async function _deleteTask(id: number, month: number, year: number) {

    try {
        await agent.TaskItems.delete(id);

    } catch (error) {
        console.log(error);
    }

    return { month, year };
}


