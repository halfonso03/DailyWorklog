

import { useQuery } from "@tanstack/react-query";
import agent from "./agent";

export function useProjects() {

    const { data: projects, isLoading: loadingProjects } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => await agent.Projects.get(),
    });


    return { projects, loadingProjects }
}
