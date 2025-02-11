import { useQuery } from "@tanstack/react-query";
import agent from "./agent";

export function useTasks(year: string, month: string, sortBy: string) {

    const { data: tasks, isLoading } = useQuery({
        queryKey: [`tasks${year}${month}${sortBy}`],
        queryFn: () => agent.TaskItems.get(+year, +month, sortBy),
    });


    return { tasks, isLoading }
}