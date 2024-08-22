"use client";
import { FC } from "react";
import { FaCheck } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { BiBug } from "react-icons/bi";
import { cn } from "../lib/tailwind-merge";
import { EpicType } from "@/entities/task/model/task";

interface EpicIconProps {
	type: EpicType;
	className?: string;
}

export const EpicIcon: FC<EpicIconProps> = ({ type, className }) => {
	const iconConfig = {
		[EpicType.Bug]: {
			icon: <BiBug size={15} color="white" />,
			bg: "bg-rose-500",
		},
		[EpicType.Epic]: {
			icon: <FaBolt size={15} color="white" />,
			bg: "bg-purple-800",
		},
		[EpicType.Task]: {
			icon: <FaCheck size={14} color="white" />,
			bg: "bg-blue-400",
		},
	};

	return (
		<div
			className={cn(
				"w-[20px] h-[20px]  flex justify-center items-center",
				className,
				iconConfig[type].bg,
			)}
		>
			{iconConfig[type].icon}
		</div>
	);
};
