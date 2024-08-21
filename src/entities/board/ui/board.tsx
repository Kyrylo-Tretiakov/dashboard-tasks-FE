'use client';
import { Column } from '@/entities/column';
import { Task } from '@/entities/task';
import { useModal } from '@/shared/model/modalStore';
import { Dropdown } from '@/shared/ui/dropdown';
import { EditableInput } from '@/shared/ui/editable-input';
import { useRouter } from 'next/navigation';
import { FC, ReactNode, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';

interface BoardProps {
    children: ReactNode
}


export const Board: FC<BoardProps> = ({ children }) => {
    const router = useRouter();
    const { onOpen } = useModal();

    const editTitle = (value: string) => {

    }

    return (
        <div className="p-8">
            <div className="flex mb-4 items-center justify-between">
                <EditableInput
                    className='text-[27px] font-mono font-bold'
                    defaultValue='DasboardName'
                    onSubmit={editTitle}
                    tooltipPlacement='top'
                    tooltipText='Click to edit Board Name'
                />
                <button onClick={() => onOpen('deleteBoard')} className='btn bg-white hover:bg-error hover:text-white'> <FaRegTrashAlt /> Delete Board</button>
            </div>
            {children}
        </div>
    );
};