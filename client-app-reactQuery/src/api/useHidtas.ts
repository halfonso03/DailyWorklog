import { useQuery } from "@tanstack/react-query";
import agent from "./agent";

export function useHidtas() {

    const { data: hidtas, isLoading: loadingHidtas } = useQuery({
        queryFn: () => agent.Hidtas.get(),
        queryKey: ['hidtas'],
    });


    return { hidtas, loadingHidtas }
}