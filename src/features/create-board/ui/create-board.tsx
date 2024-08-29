"use client";
import { Dialog } from "@/shared/ui/dialog";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/shared/ui/input";
import { useModal } from "@/shared/model/modalStore";
import useMutate from "@/shared/api/use-mutate";
import { ApiRoutes, HttpMethods, QueryKeys } from "@/shared/lib/constants";
import { useUser } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";

type Inputs = {
	boardName: string;
	boardDescription: string;
};

const creatBoardSchema = yup.object().shape({
	boardName: yup.string().required("This field is Required").min(4),
	boardDescription: yup.string().required("This field is Required").min(7),
});

export const CreateBoardModal = () => {
	const { onClose } = useModal();
	const { user } = useUser();
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(creatBoardSchema),
		mode: "onChange",
	});
	const { mutateAsync, isPending } = useMutate({
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [QueryKeys.Boards, user?.id],
			});
			toast.success("Board created successfully!");
		},
		onPendign: () => {
			toast.info(`Loading...`);
		},
		onError: () => {
			toast.error(`Something gone wrong`);
		},
	});

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		await mutateAsync({
			url: ApiRoutes.createBoard,
			method: HttpMethods.POST,
			body: {
				userId: user?.id,
				boardName: data.boardName,
				boardDescription: data?.boardDescription,
			},
		});
		onClose();
	};

	return (
		<Dialog title="Create Board">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-y-4 items-center py-4"
			>
				<Input
					error={errors["boardName"]?.message}
					className="min-w-[430px]"
					name="boardName"
					reg={register}
					label="What is your board name?"
					placeholder="Board Name"
				/>
				<Input
					error={errors["boardDescription"]?.message}
					className="min-w-[430px]"
					name="boardDescription"
					reg={register}
					label="What is your board description?"
					placeholder="Board Description"
				/>
				<button disabled={isPending} type="submit" className="btn btn-neutral mt-[12px] px-10">
					Create
				</button>
			</form>
		</Dialog>
	);
};
