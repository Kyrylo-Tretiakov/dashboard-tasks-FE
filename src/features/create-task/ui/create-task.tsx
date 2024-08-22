"use client";

import useMutate from "@/shared/api/use-mutate";
import { ApiRoutes, HttpMethods, QueryKeys } from "@/shared/lib/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";

export const CreateTask = ({ columnId }: { columnId: string }) => {
	const [openForm, setOpenForm] = useState(false);
	const [value, setValue] = useState("");
	const params = useParams();
	const queryClient = useQueryClient();
	const formRef = useRef<HTMLDivElement>(null);
	const { mutate: createTask } = useMutate({
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QueryKeys.Board, params?.boardId],
			});
		},
	});

	const handleCreateTask = async () => {
		reset();
		if (!value) return;
		await createTask({
			url: ApiRoutes.createTask,
			method: HttpMethods.POST,
			body: { name: value, columnId },
		});
		toast.success("Task Created");
	};

	const reset = () => {
		setOpenForm(false);
		setValue("");
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				reset();
			}
		};

		if (openForm) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [openForm]);

	return (
		<>
			{openForm ? (
				<div
					ref={formRef}
					tabIndex={1}
					autoFocus
					className="w-full min-w-[300px] h-max cursor-pointer rounded-2xl transition duration-200 bg-white group hover:shadow-xl border border-zinc-100"
				>
					<div className="p-4">
						<input
							value={value}
							tabIndex={2}
							onChange={(e: any) => setValue(e.target.value)}
							className="input font-bold focus:outline-none focus:border-none"
							placeholder="What needs to be done?"
						/>
						<div tabIndex={3} className="flex justify-end">
							<button
								onClick={handleCreateTask}
								tabIndex={4}
								className="btn btn-primary btn-sm"
							>
								Create
							</button>
						</div>
					</div>
				</div>
			) : (
				<button
					onClick={() => setOpenForm(true)}
					className="btn text-base flex items-center gap-x-2"
				>
					<IoMdAdd size={20} /> Create Task
				</button>
			)}
		</>
	);
};
