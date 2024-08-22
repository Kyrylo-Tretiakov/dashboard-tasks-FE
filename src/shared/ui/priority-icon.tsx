"use client";
import { FC } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaGripLines } from "react-icons/fa6";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { PriorityType } from "@/entities/task/model/task";

interface PriorityIconProps {
	type: PriorityType;
}

export const PriorityIcon: FC<PriorityIconProps> = ({ type }) => {
	const iconByType = {
		[PriorityType.Low]: <IoIosArrowDown className="text-blue-500" size={20} />,
		[PriorityType.Medium]: <FaGripLines className="text-blue-500" />,
		[PriorityType.High]: (
			<IoIosArrowDown className="text-red-400 rotate-180" size={20} />
		),
		[PriorityType.Critical]: (
			<MdKeyboardDoubleArrowUp className="text-red-400 " size={24} />
		),
	};
	return iconByType[type];
};
