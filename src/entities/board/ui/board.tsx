'use client';
import { Column } from '@/entities/column';
import { Task } from '@/entities/task';
import { Dropdown } from '@/shared/ui/dropdown';
import { useRouter } from 'next/navigation';
import { FC, ReactNode, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';

interface BoardProps {
    children: ReactNode
}


export const Board: FC<BoardProps> = ({ children }) => {
    const router = useRouter();

    const options = [
        {
            handler: () => { },
            node: (
                <button className="btn btn-ghost">
                    <FaRegEdit /> <span>Edit Board</span>
                </button>
            ),
        },
        {
            handler: () => { },
            node: (
                <button className="btn btn-ghost">
                    <FaRegTrashAlt /> Delete Board
                </button>
            ),
        },
    ];
    return (
        <div className="p-8">
            <div className="flex mb-4 items-center justify-between">
                <h1 className="text-[27px] font-mono font-bold ">Dashboard Name</h1>
                <Dropdown buttonText="Details" options={options} />
            </div>
            {children}
        </div>
    );
};