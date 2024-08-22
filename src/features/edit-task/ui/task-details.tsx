"use client";

import { ITask } from "@/entities/task/model/task";
import useMutate from "@/shared/api/use-mutate";
import { ApiRoutes, HttpMethods, QueryKeys } from "@/shared/lib/constants";
import { Avatar } from "@/shared/ui/avatar";
import { Select, SelectOptionType } from "@/shared/ui/select";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { FC, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { BiSolidUserCircle } from "react-icons/bi";
import { epicOptions, priorityOptions } from "../model/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import useFetch from "@/shared/api/use-fetch";

interface TaskDetailsProps {
	task: ITask;
}

export const TaskDetails: FC<TaskDetailsProps> = ({ task }) => {
	const { formState } = useFormContext();
	const { user } = useUser();
	const queryClient = useQueryClient();
	const params = useParams();
	const { mutate: upateTask } = useMutate({
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: [QueryKeys.Task, task?.id] });
			queryClient.invalidateQueries({
				queryKey: [QueryKeys.Board, params?.boardId],
			});
		},
	});
	const { data: column } = useFetch({
		key: QueryKeys.Column,
		id: task?.columnId,
		url: `${ApiRoutes.column}/${task?.columnId}`,
	});

	const assigneOptions = [
		{
			value: "Unassigned",
			node: (
				<div className="flex items-center gap-x-2">
					<BiSolidUserCircle className="text-slate-400" size={29} /> Unassigned
				</div>
			),
		},
		{
			value: user?.id ?? "none",
			node: (
				<div className="flex items-center gap-x-2">
					<Avatar url={user?.imageUrl as string} /> {user?.fullName}
				</div>
			),
		},
	];

	const createdTaskDate = useMemo(() => {
		const date = new Date(task?.createdAt);
		return format(date, "d MMMM yyyy: HH:mm");
	}, [task]);

	const updateTaskField = async (obj: Record<string, string>) => {
		await upateTask({
			url: ApiRoutes.updateTask,
			method: HttpMethods.PUT,
			body: {
				taskId: task?.id,
				...obj,
			},
		});
	};

	const { priorityValue, epicValue } = useMemo(() => {
		return {
			priorityValue: priorityOptions.find(
				(option) => option.value === task.priority,
			),
			epicValue: epicOptions.find((option) => option.value === task?.epic),
		};
	}, [task.epic, task.priority, task]);

	return (
		<div className="w-[60%] h-full flex gap-6 flex-col">
			<div className="flex items-end gap-x-2">
				<span className="font-semibold mb-2 w-[100px]">Assigne</span>
				<Select
					defaultText={"Choose task assigner"}
					option={
						task?.assigneeId && task?.assigneeId !== "Unassigned"
							? (assigneOptions[1] as SelectOptionType)
							: assigneOptions[0]
					}
					onSelect={(item) => updateTaskField({ assigneeId: item.value })}
					options={assigneOptions}
				/>
			</div>
			<div className="flex items-end gap-x-2">
				<span className="font-semibold mb-2 w-[100px]">Priority</span>
				<Select
					defaultText={"Choose priority"}
					option={priorityValue as SelectOptionType}
					onSelect={(item) => updateTaskField({ priority: item.value })}
					options={priorityOptions}
				/>
			</div>
			<div className="flex items-end gap-x-2">
				<span className="font-semibold mb-2 w-[100px]">Epic</span>
				<Select
					defaultText={"Choose task epic"}
					option={epicValue as SelectOptionType}
					onSelect={(item) => updateTaskField({ epic: item.value })}
					options={epicOptions}
				/>
			</div>
			<div className="mt-10 flex flex-col gap-y-4">
				<span className="text-slate-400">Created: {createdTaskDate}</span>
				<div className="flex gap-x-4 font-semibold ">
					<div className="w-[70px]">Reporter:</div>
					<Avatar url={user?.imageUrl as string} />{" "}
					<span className="font-normal">Vitalik Golubovich</span>
				</div>
				<div className="flex items-center gap-x-4 font-semibold ">
					<div className="w-[70px]">Status:</div>
					<span className="border border-lightPurple transition-all p-2 min-w-[80px] text-center rounded-lg cursor-default hover:bg-lightPurple">
						{column?.name}
					</span>
				</div>
			</div>
		</div>
	);
};
