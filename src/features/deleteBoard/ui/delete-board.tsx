'use client';
import { Dialog } from "@/shared/ui/dialog"
import { toast } from "react-toastify";
import { useModal } from "@/shared/model/modalStore";
import { useRouter } from "next/navigation";

export const DeleteBoardModal = () => {
    const { onClose } = useModal();
    const router = useRouter();

    const onSubmit = () => {
        toast.error('Board Deleted', {
            theme: 'colored'
        })
        onClose();
        router.back();
    }

    return (
        <Dialog title=''>
            <div className="py-4">
                <span className="font-bold text-xl text-center">Are you sure you want to delete this board?</span>
                <div className="flex justify-center mt-6 gap-x-4 ">
                    <button onClick={onClose} type="submit" className="btn btn-neutral mt-[12px] px-10">Cancel</button>
                    <button onClick={onSubmit} type="submit" className="btn btn-neutral mt-[12px] px-10">Yes</button>
                </div>
            </div>
        </Dialog>
    )
}