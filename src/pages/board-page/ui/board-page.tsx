"use client";
import { Board } from "@/entities/board";
import { Column } from "@/entities/column";
import { IColumn } from "@/entities/column/model/column";
import { Task } from "@/entities/task";
import { CreateColumn } from "@/features/create-column";
import { CreateTask } from "@/features/create-task";
import useFetch from "@/shared/api/use-fetch";
import useMutate from "@/shared/api/use-mutate";
import { ApiRoutes, HttpMethods, QueryKeys } from "@/shared/lib/constants";
import { Loader } from "@/shared/ui/loader";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from "react-beautiful-dnd";

const BoardPage = () => {
	const router = useRouter();
	const params = useParams();
	const { mutate: updateTaskPosition } = useMutate({
		onSuccess: () => {
			refetchBoard();
		},
	});
	const {
		data: board,
		isLoading,
		isError,
		refetch: refetchBoard,
	} = useFetch({
		key: QueryKeys.Board,
		id: params?.boardId as string,
		url: `${ApiRoutes.board}/${params?.boardId}`,
	});

	const columns = board?.columns as IColumn[];

	const onDragEnd = async (result: DropResult) => {
		const { source, destination } = result;

		if (!destination) {
			return;
		}

		const sourceColumnIndex = columns.findIndex(
			(column) => column.id === source.droppableId,
		);
		const destinationColumnIndex = columns.findIndex(
			(column) => column.id === destination.droppableId,
		);

		const sourceColumn = columns[sourceColumnIndex];
		const destinationColumn = columns[destinationColumnIndex];

		const [movedCard] = sourceColumn.tasks.splice(source.index, 1);

		destinationColumn.tasks.splice(destination.index, 0, movedCard);
		await updateTaskPosition({
			url: ApiRoutes.moveTask,
			method: HttpMethods.PUT,
			body: {
				taskId: movedCard.id,
				newColumnId: destination.droppableId,
				destinationIndex: destination.index,
			},
		});
	};

	if (isLoading) return <Loader className="" />;
	if (isError) {
		router.back();
	}

	return (
		<div className="overflow-hidden">
			<Board boardName={board?.boardName ?? "Uknown"}>
				<DragDropContext onDragEnd={onDragEnd}>
					<div className="flex space-x-4 overflow-x-scroll no-scrollbar">
						{columns.map((column, columnIndex) => (
							<Droppable key={columnIndex} droppableId={column.id}>
								{(provided) => (
									<Column
										allowDelete={columnIndex !== 0}
										columnId={column.id}
										title={column.name}
										provided={provided}
									>
										{column?.tasks?.map((task, taskIndex) => (
											<Draggable
												key={task.id}
												draggableId={task.id}
												index={taskIndex}
											>
												{(provided, snapshot) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<Task
															isDragging={snapshot.isDragging}
															key={task.id}
															task={task}
														/>
													</div>
												)}
											</Draggable>
										))}
										<CreateTask columnId={column.id} />
										{provided.placeholder}
									</Column>
								)}
							</Droppable>
						))}
						<CreateColumn />
					</div>
				</DragDropContext>
			</Board>
		</div>
	);
};

export default BoardPage;
