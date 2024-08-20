'use client'

import { CreateBoardModal } from "@/features/create-board"
import { EditTaskModal } from "@/features/edit-task";
import { ModalType, useModal } from "@/shared/model/modalStore"

export const ModalProvider = () => {
    const { type } = useModal();

    const modalByType = {
        'createBoard': <CreateBoardModal />,
        'editTask': <EditTaskModal />

    }

    return (
        <div className="relative">
            {modalByType[type as ModalType] ?? <div />}
        </div>
    )
}