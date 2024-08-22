"use client";

import useMutate from "@/shared/api/use-mutate";
import { ApiRoutes, HttpMethods, QueryKeys } from "@/shared/lib/constants";
import { EditableInput } from "@/shared/ui/editable-input";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FC } from "react";
import { IoIosAdd } from "react-icons/io";
import { toast } from "react-toastify";

export const CreateColumn: FC = () => {
	const params = useParams();
	const boardId = params?.boardId;
	const queryClient = useQueryClient();
	const { mutate: createColumn, isPending } = useMutate({
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QueryKeys.Board, params?.boardId],
			});
			toast.success("Column Created !");
		},
		onPending() {
			toast.info("Creating...");
		},
		onError() {
			toast.error("Something went wrong");
		},
	});

	const handleCreateColumn = async (name: string) => {
		await createColumn({
			url: ApiRoutes.createColumn,
			method: HttpMethods.POST,
			body: {
				name,
				boardId,
			},
		});
	};

	return (
		<div className="pt-2 px-2 mr-4">
			<EditableInput
				tooltipPlacement="bottom"
				tooltipText="Click to add new column"
				icon={
					<IoIosAdd
						className="bg-slate-200 flex shrink-0 h-[30px] w-[30px] cursor-pointer"
						size={10}
					/>
				}
				inputClassName="w-[320px] focus:outline-none focus:border-none font-bold text-base"
				defaultValue=""
				onSubmit={handleCreateColumn}
			/>
		</div>
	);
};
