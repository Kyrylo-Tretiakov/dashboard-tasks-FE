import { Task } from "@/entities/task";
import useMutate from "@/shared/api/use-mutate";
import { ApiRoutes, HttpMethods, QueryKeys } from "@/shared/lib/constants";
import { useModal } from "@/shared/model/modalStore";
import { EditableInput } from "@/shared/ui/editable-input";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FC, ReactNode } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDrop } from "react-dnd";
import { FaRegTrashAlt } from "react-icons/fa";
import { PiNotepadBold } from "react-icons/pi";
import { toast } from "react-toastify";

interface ColumnProps {
	children: ReactNode;
	provided: any;
	title: string;
	columnId: string;
	allowDelete: boolean;
}

export const Column: FC<ColumnProps> = ({
	children,
	provided,
	title,
	columnId,
	allowDelete,
}) => {
	const { onOpen } = useModal();
	const params = useParams();
	const queryClient = useQueryClient();
	const { mutate: upadateColumnName } = useMutate({
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

	const onEditTitle = async (name: string) => {
		await upadateColumnName({
			url: ApiRoutes.updateColumn,
			method: HttpMethods.PUT,
			body: {
				columnId,
				name,
			},
		});
	};

	const handleDelete = async () => {
		onOpen("deleteColumn", { columnId });
	};

	return (
		<div
			ref={provided.innerRef}
			{...provided.droppableProps}
			className="bg-lightPurple p-4 min-w-[335px] max-w-[335px] h-full overflow-y-hidden rounded-2xl"
		>
			<div className="flex items-start justify-between w-full">
				<div className="flex px-2 pb-8 text-darkPurple font-bold text-lg items-center gap-x-2">
					<EditableInput
						className="text-darkPurple cursor-pointer text-lg font-bold"
						icon={<PiNotepadBold />}
						defaultValue={title}
						onSubmit={onEditTitle}
					/>
				</div>
				{allowDelete && (
					<FaRegTrashAlt
						onClick={handleDelete}
						className="hover:opacity-[0.7] cursor-pointer"
						color="red"
					/>
				)}
			</div>
			<div className="flex flex-col overflow-y-scroll no-scrollbar h-[calc(100vh-330px)] pb-10 gap-y-[10px]">
				{children}
			</div>
		</div>
	);
};
