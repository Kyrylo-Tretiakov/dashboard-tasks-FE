"use client";

import { FC, ReactNode, useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { cn } from "../lib/tailwind-merge";

export type SelectOptionType = {
	node?: ReactNode;
	value: string;
};

interface SelectProps {
	defaultText: string;
	options: SelectOptionType[];
	option?: SelectOptionType;
	onSelect: (item: SelectOptionType) => void;
}

export const Select: FC<SelectProps> = ({
	defaultText,
	options,
	option,
	onSelect,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div ref={containerRef} className="relative inline-block w-full">
			<div
				onClick={handleToggle}
				className="bg-slate-100  transition duration-200 cursor-pointer p-2 rounded-lg flex justify-between items-center"
			>
				{option?.node ? (
					<div className="text-[13px]">{option?.node}</div>
				) : (
					<div className="text-gray-500 text-[12px]">{defaultText}</div>
				)}
				<FaChevronDown
					className={cn("transition-all", isOpen ? "rotate-180" : "rotate-0")}
				/>
			</div>
			{isOpen && (
				<ul className="absolute mt-1 w-full bg-white drop-shadow-2xl z-[100] rounded-lg shadow-4xl overflow-hidden transition transform duration-200 ease-in-out scale-95 origin-top">
					{options.map((option) => (
						<li
							key={option.value}
							onClick={() => {
								onSelect(option);
								setIsOpen(false);
							}}
							className="px-4 py-2  hover:bg-gray-100 cursor-pointer"
						>
							{option.node}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
