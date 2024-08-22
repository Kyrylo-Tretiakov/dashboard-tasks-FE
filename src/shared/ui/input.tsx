"use client";
import { FC } from "react";
import { cn } from "../lib/tailwind-merge";

interface InputProps {
	reg: any;
	placeholder?: string;
	name: string;
	label?: string;
	className?: string;
	error?: any;
}

export const Input: FC<InputProps> = ({
	placeholder,
	label,
	reg,
	name,
	className,
	error,
}) => {
	return (
		<div>
			<div className="label">
				<span className="label-text">{label}</span>
			</div>
			<div className="relative">
				<input
					className={cn(
						"input  w-full max-w-xs",
						error
							? "border-red-400 focus:border-red-400  focus:outline-none"
							: "input-bordered",
						className,
					)}
					placeholder={placeholder}
					{...reg(name)}
				/>
				<span className="text-red-400 font-bold text-xs absolute bottom-[-24px] left-0">
					{error}
				</span>
			</div>
		</div>
	);
};
