import { QueryOptions, useQuery } from "@tanstack/react-query";
import api from "./axios";

export const fetchData = async (url: string) => {
	const { data } = await api.get(url);
	return data;
};

const useFetch = ({ key, url, id }: Record<string, string>) => {
	return useQuery({
		queryKey: [key, id],
		queryFn: () => fetchData(url),
		refetchOnMount: true,
		enabled: true,
	});
};

export default useFetch;
