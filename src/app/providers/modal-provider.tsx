'use client'

import { CreateBoardModal } from "@/features/create-board"
import { DeleteBoardModal } from "@/features/deleteBoard";
import { EditTaskModal } from "@/features/edit-task";
import { ModalType, useModal } from "@/shared/model/modalStore"

export const ModalProvider = () => {
    const { type } = useModal();

    const modalByType = {
        'createBoard': <CreateBoardModal />,
        'editTask': <EditTaskModal />,
        'deleteBoard': <DeleteBoardModal />
    }

    return (
        <div className="relative">
            {modalByType[type as ModalType] ?? <div />}
        </div>
    )
}