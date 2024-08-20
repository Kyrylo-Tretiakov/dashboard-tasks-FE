import { Task } from "@/entities/task";
import { EditableInput } from "@/shared/ui/editable-input";
import { FC, ReactNode } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDrop } from "react-dnd";
import { PiNotepadBold } from "react-icons/pi";

interface ColumnProps {
    children: ReactNode
    provided: any
    title: string;
}


export const Column: FC<ColumnProps> = ({ children, provided, title }) => {

    const onEditTitle = (value: string) => {

    }

    return (
        <div ref={provided.innerRef}
            {...provided.droppableProps} className="bg-lightPurple p-4 w-[335px] h-full overflow-y-hidden rounded-2xl">
            <div className="flex px-2 pb-8 text-darkPurple font-bold text-lg items-center gap-x-2">
                <EditableInput
                    className="text-darkPurple cursor-pointer text-lg font-bold"
                    icon={<PiNotepadBold />}
                    defaultValue={title}
                    onSubmit={onEditTitle}
                />
            </div>
            <div className="flex flex-col overflow-y-scroll no-scrollbar h-[500px] pb-10 gap-y-[10px]">
                {children}
            </div>
        </div>
    )
}