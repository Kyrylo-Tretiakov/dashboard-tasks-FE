"use client";
import { Dialog } from "@/shared/ui/dialog";
import { toast } from "react-toastify";
import { useModal } from "@/shared/model/modalStore";
import useMutate from "@/shared/api/use-mutate";
import { ApiRoutes, HttpMethods, QueryKeys } from "@/shared/lib/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const DeleteColumnModal = () => {
	const { onClose, data } = useModal();
	const { columnId } = data;
	const queryClient = useQueryClient();
	const params = useParams();

	const { mutate: deleteColumn } = useMutate({
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QueryKeys.Board, params?.boardId],
			});
			toast.success("Column Deleted !");
		},
		onPending() {
			toast.info("Deleting...");
		},
		onError() {
			toast.error("Something went wrong");
		},
	});

	const onSubmit = async () => {
		await deleteColumn({
			url: ApiRoutes.deleteColumn,
			method: HttpMethods.DELETE,
			body: { columnId },
		});
		onClose();
	};

	return (
		<Dialog title="">
			<div className="py-4">
				<span className="font-bold text-xl text-center">
					Are you sure you want to delete this column?
				</span>
				<div className="flex justify-center mt-6 gap-x-4 ">
					<button
						onClick={onClose}
						type="submit"
						className="btn btn-neutral mt-[12px] px-10"
					>
						Cancel
					</button>
					<button
						onClick={onSubmit}
						type="submit"
						className="btn btn-neutral mt-[12px] px-10"
					>
						Yes
					</button>
				</div>
			</div>
		</Dialog>
	);
};
