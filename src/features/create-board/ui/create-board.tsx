'use client';
import { Dialog } from "@/shared/ui/dialog"
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/shared/ui/input";
import { useModal } from "@/shared/model/modalStore";

type Inputs = {
    boardName: string
}

const creatBoardSchema = yup.object().shape({
    boardName: yup.string().required('This field is Required').min(4),
});

export const CreateBoardModal = () => {
    const { onClose } = useModal();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(creatBoardSchema),
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        toast.success('Board created!', {
            theme: 'colored'
        })
        onClose();
    }

    return (
        <Dialog title='Create Board'>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-x-2 items-end py-4">
                <Input
                    error={errors['boardName']?.message}
                    className="min-w-[330px]"
                    name="boardName"
                    reg={register}
                    label="What is your board name?" placeholder="Board Name"
                />
                <button type="submit" className="btn btn-neutral mt-[12px] px-10">Create</button>
            </form>
        </Dialog>
    )
}