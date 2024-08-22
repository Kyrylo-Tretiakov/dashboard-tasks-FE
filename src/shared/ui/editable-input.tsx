"use client";

import { FC, ReactNode, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { cn } from "../lib/tailwind-merge";

interface EditableInputProps {
	className?: string;
	onSubmit: (value: string) => void;
	defaultValue: string;
	icon?: ReactNode;
	inputClassName?: string;
	tooltipPlacement?: "bottom" | "top" | "left" | "right";
	tooltipText?: string;
}

export const EditableInput: FC<EditableInputProps> = ({
	inputClassName,
	className,
	onSubmit,
	defaultValue,
	icon,
	tooltipPlacement = "bottom",
	tooltipText = "Click to edit",
}) => {
	const [editable, setEditable] = useState(false);
	const [value, setValue] = useState<string>("");

	const handleSubmit = async () => {
		await onSubmit(value as string);
		reset();
	};

	const reset = () => {
		setEditable(false);
		setValue("");
	};

	return (
		<div>
			{!editable ? (
				<div
					className={cn("tooltip cursor-pointer tooltip-bottom")}
					data-tip={tooltipText}
				>
					<span
						onClick={() => setEditable(true)}
						className={cn("flex items-center gap-x-2", className)}
					>
						{icon}
						{defaultValue}
					</span>
				</div>
			) : (
				<div className="relative flex gap-x-2 items-center" onBlur={reset}>
					<input
						autoFocus
						className={cn("input  max-w-xs input-sm", inputClassName)}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						defaultValue={defaultValue}
					/>
					<div
						tabIndex={2}
						className="absolute right-0 top-[38px] z-10  flex items-center gap-x-2"
					>
						<FaCheck
							onMouseDown={(e) => e.preventDefault()}
							onClick={handleSubmit}
							className="bg-white p-[3px] cursor-pointer border border-1 rounded-sm"
							size={19}
						/>
						<AiOutlineClose
							onMouseDown={(e) => e.preventDefault()}
							onClick={() => setEditable(false)}
							className="bg-white p-[3px] cursor-pointer border border-1 rounded-sm"
							size={19}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
