import { useQuery } from "@tanstack/react-query";
import agent from "./agent";

export function useRequestors(hidtaId: number | null) {

    const { data: requestors, isLoading: loadingRequestors } = useQuery({
        queryKey: [`requestors${hidtaId}`],
        queryFn: async () => {
            if (!hidtaId || hidtaId === 0) return null;
            const response = await agent.Requestors.get(hidtaId);
            const req = response.map((r) => ({
                value: r.id.toString(),
                text: `${r.firstName}  ${r.lastName} (${r.email})`,
            }));
            return req;
        },
    });


    return { requestors, loadingRequestors };
}

