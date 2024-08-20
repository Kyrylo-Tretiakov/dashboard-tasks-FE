'use client';

import { FC, ReactNode, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { cn } from "../lib/tailwind-merge";

interface EditableInputProps {
    className: string;
    onSubmit: (value: string) => void;
    defaultValue: string;
    icon?: ReactNode;
}

export const EditableInput: FC<EditableInputProps> = ({ className, onSubmit, defaultValue, icon }) => {
    const [editable, setEditable] = useState(false);
    const [value, setValue] = useState<string>('');

    return (
        <div>
            {!editable ?
                <span
                    onClick={() => setEditable(true)}
                    className={cn('flex items-center gap-x-2', className)}
                >
                    {icon}{defaultValue}
                </span> :
                <div className="relative flex gap-x-2 items-center">
                    {icon}
                    <input
                        autoFocus
                        onBlur={() => setEditable(false)}
                        className="input  max-w-xs input-sm"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        defaultValue={defaultValue}
                    />
                    <div className="absolute right-0 top-[38px] z-10  flex items-center gap-x-2">
                        <FaCheck
                            onClick={() => onSubmit(value as string)}
                            className="bg-white p-[3px] cursor-pointer border border-1 rounded-sm"
                            size={19}
                        />
                        <AiOutlineClose
                            onClick={() => setEditable(false)}
                            className="bg-white p-[3px] cursor-pointer border border-1 rounded-sm"
                            size={19}
                        />
                    </div>
                </div>
            }
        </div>
    )
}