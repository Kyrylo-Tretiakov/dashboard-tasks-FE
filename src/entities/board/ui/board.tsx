"use client";
import { Column } from "@/entities/column";
import { Task } from "@/entities/task";
import useMutate from "@/shared/api/use-mutate";
import { ApiRoutes, HttpMethods, QueryKeys } from "@/shared/lib/constants";
import { useModal } from "@/shared/model/modalStore";
import { EditableInput } from "@/shared/ui/editable-input";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { FC, ReactNode, useState } from "react";
import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from "react-beautiful-dnd";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";

interface BoardProps {
	children: ReactNode;
	boardName: string;
}

export const Board: FC<BoardProps> = ({ children, boardName }) => {
	const router = useRouter();
	const { onOpen } = useModal();
	const params = useParams();
	const queryClient = useQueryClient();
	const { mutate: updateBoardName, isPending } = useMutate({
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QueryKeys.Board, params?.boardId],
			});
			toast.success("Name edited !");
		},
		onPending() {
			toast.info("Editing...");
		},
		onError() {
			toast.error("Something went wrong");
		},
	});

	const handleEditBoardName = async (value: string) => {
		await updateBoardName({
			url: `${ApiRoutes.board}/${params?.boardId}`,
			method: HttpMethods.PUT,
			body: { name: value },
		});
	};

	return (
		<div className="p-8">
			<div className="flex mb-6 items-center justify-between">
				<EditableInput
					className="text-[27px] font-mono font-bold"
					defaultValue={boardName}
					onSubmit={handleEditBoardName}
					tooltipPlacement="top"
					tooltipText="Click to edit Board Name"
				/>
				<button
					onClick={() => onOpen("deleteBoard")}
					className="btn bg-white hover:bg-error hover:text-white"
				>
					{" "}
					<FaRegTrashAlt /> Delete Board
				</button>
			</div>
			{children}
		</div>
	);
};
