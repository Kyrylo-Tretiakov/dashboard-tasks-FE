import {
	useMutation,
	UseMutationOptions,
	UseMutationResult,
} from "@tanstack/react-query";
import api from "./axios";
import { HttpMethods } from "../lib/constants";

interface MutationData<T> {
	url: string;
	method: HttpMethods;
	body?: T;
}

const mutateData = async <T, R>({
	url,
	method,
	body,
}: MutationData<T>): Promise<R> => {
	const response = await api({
		method,
		url,
		data: body,
	});
	return response.data;
};

const useMutate: any = (options?: UseMutationOptions) => {
	return useMutation({
		mutationFn: (mutationData: any) => mutateData(mutationData),
		...options,
	});
};

export default useMutate;
