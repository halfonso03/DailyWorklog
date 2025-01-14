import { useQuery } from "@tanstack/react-query";
import agent from "./agent";

export function useTasks(year: string, month: string) {

    const { data: tasks, isLoading } = useQuery({
        queryKey: [`tasks${year}${month}`],
        queryFn: () => agent.TaskItems.get(+year, +month),
    });


    return { tasks, isLoading }
}