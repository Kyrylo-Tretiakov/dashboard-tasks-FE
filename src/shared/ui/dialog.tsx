'use client';
import { FC, ReactNode } from "react"
import { ModalType, useModal } from "../model/modalStore";
import { cn } from "../lib/tailwind-merge";

interface DialogProps {
    children: ReactNode;
    title: string;
}

export const Dialog: FC<DialogProps> = ({ children, title }) => {
    const { isOpen, onClose } = useModal();
    const handleClose = () => {
        onClose();
    }

    return (
        <div className={cn("bg-[#00000080] z-30 fixed transition-all h-screen w-screen", isOpen ? 'inset-0' : 'top-[-100%]')}>
            <div className="modal-box mx-auto mt-40">
                <form method="dialog">
                    <button onClick={handleClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{children}</p>
            </div>
        </div>
    )
}
