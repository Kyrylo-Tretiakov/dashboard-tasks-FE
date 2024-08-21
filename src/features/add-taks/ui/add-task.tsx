'use client';

import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";

export const AddTask = ({ columnId }: { columnId: string }) => {
    const [openForm, setOpenForm] = useState(false);

    const handleCreateTask = () => {
        toast.success('Task Created');
        setOpenForm(false)
    }

    return (

        <>
            {openForm ?
                <div tabIndex={1} autoFocus onBlur={() => setOpenForm(false)} className="w-full min-w-[300px] h-max cursor-pointer rounded-2xl transition duration-200  bg-white group hover:shadow-xl border border-zinc-100">
                    <div className="p-4">
                        <input autoFocus className="input font-bold focus:outline-none focus:border-none" placeholder="What needs to be done?" />
                        <div className="flex justify-end">
                            <button onClick={handleCreateTask} className="btn btn-primary btn-sm "> Create</button>
                        </div>
                    </div>
                </div>
                :
                <button onClick={() => setOpenForm(true)} className="btn  text-base flex items-center gap-x-2">
                    <IoMdAdd size={20} /> Create Task
                </button >
            }
        </>
    )

}