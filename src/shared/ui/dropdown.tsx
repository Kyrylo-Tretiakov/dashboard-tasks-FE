'use client';

import { FC, ReactNode } from "react";

type OptionType = {
    node: ReactNode,
    handler: () => void;
}

interface DropdownProps {
    buttonText: string;
    options: OptionType[];
}

export const Dropdown: FC<DropdownProps> = ({ buttonText, options }) => {

    return (
        <ul className="menu menu-horizontal px-1">
            <li>
                <details>
                    <summary className="bg-white w-40">
                        {buttonText}
                    </summary>
                    <ul className="p-2 bg-base-100 rounded-t-none !mt-[3px] ">
                        {options.map((option) => (
                            <li  onClick={option.handler}>{option.node}</li>
                        ))}
                    </ul>
                </details>
            </li>
        </ul>
    )
}