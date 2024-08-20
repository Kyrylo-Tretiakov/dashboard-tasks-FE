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

export const EditTaskModal = () => {
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
        <Dialog title='Task 1'>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center py-4">
                <div className="w-full">

                </div>
                <div className="">

                </div>
            </form>
        </Dialog>
    )
}