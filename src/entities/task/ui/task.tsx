"use client";

import React, { FC, useMemo } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/shared/lib/tailwind-merge";
import { useModal } from "@/shared/model/modalStore";
import { EpicType, ITask, PriorityType } from "../model/task";
import { BiSolidUserCircle } from "react-icons/bi";
import { format } from "date-fns";
import { EpicIcon } from "@/shared/ui/epic-icon";
import { PriorityIcon } from "@/shared/ui/priority-icon";
import { useParams } from "next/navigation";

interface TaskProps {
	task: ITask;
	isDragging: boolean;
}

export const Task: FC<TaskProps> = ({ task, isDragging }) => {
	const { user } = useUser();
	const { onOpen } = useModal();
	const params = useParams();

	const avatarUrl = useMemo(() => {
		if (task?.assigneeId && task?.assigneeId !== "Unassigned") {
			return (
				<Image
					src={user?.imageUrl as string}
					className="rounded-xl"
					width={25}
					height={25}
					alt="user image"
				/>
			);
		}
		return <BiSolidUserCircle className="text-slate-400" size={29} />;
	}, [user, task]);

	const createdDate = useMemo(() => {
		const date = new Date(task?.createdAt);
		return format(date, "do MMMM, yyyy");
	}, [task]);

	return (
		<div className=" mx-auto">
			<div
				onClick={() => onOpen("editTask", { taskId: task.id })}
				className={cn(
					"relative overflow-hidden h-full w-full min-w-[300px] cursor-pointer rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-100",
					isDragging ? "opacity-[0.5]" : "opacity-1",
				)}
			>
				<div className="p-4">
					<div className="flex items-center justify-between mb-6">
						<h2 className="font-bold  text-lg text-zinc-700">{task?.name}</h2>
						<div className="">
							{task?.priority ? <PriorityIcon type={task?.priority} /> : ""}
						</div>
					</div>
					<div className="flex flex-row justify-between items-center mt-4">
						<div className="flex items-center gap-x-2">
							{task?.epic ? (
								<EpicIcon className="rounded-md" type={task.epic} />
							) : (
								""
							)}
							<span className="text-sm text-gray-500">{createdDate}</span>
						</div>
						{avatarUrl}
					</div>
				</div>
			</div>
		</div>
	);
};
