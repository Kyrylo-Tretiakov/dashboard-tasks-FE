'use client';

import { EditableInput } from "@/shared/ui/editable-input";
import { IoIosAdd } from "react-icons/io";

export const AddColumn = () => {
    return (
        <div className="pt-2 px-2 mr-4">
            <EditableInput tooltipText="Click to add new column" icon={<IoIosAdd className="bg-slate-200 flex shrink-0 h-[30px] w-[30px] cursor-pointer" size={10} />} inputClassName="w-[320px] focus:outline-none focus:border-none font-bold text-base" defaultValue="" onSubmit={() => { }} />
        </div>
    )
}