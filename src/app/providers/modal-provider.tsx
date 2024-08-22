"use client";
import { CreateBoardModal } from "@/features/create-board";
import { DeleteBoardModal } from "@/features/delete-board";
import { DeleteColumnModal } from "@/features/delete-column";
import { EditTaskModal } from "@/features/edit-task";
import { ModalType, useModal } from "@/shared/model/modalStore";
import { ReactNode } from "react";

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const { type } = useModal();

	const modalByType: Record<ModalType, JSX.Element | null> = {
		createBoard: <CreateBoardModal />,
		editTask: <EditTaskModal />,
		deleteBoard: <DeleteBoardModal />,
		deleteColumn: <DeleteColumnModal />,
		none: null,
	};

	return (
		<div className="relative">
			{modalByType[(type as ModalType) || "none"]}
			{children}
		</div>
	);
};
