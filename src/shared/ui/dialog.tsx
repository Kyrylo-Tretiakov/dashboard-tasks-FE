"use client";
import { FC, ReactNode } from "react";
import { useModal } from "../model/modalStore";
import { cn } from "../lib/tailwind-merge";

interface DialogProps {
	children: ReactNode;
	title: string;
	className?: string;
}

export const Dialog: FC<DialogProps> = ({ children, title, className }) => {
	const { isOpen, onClose } = useModal();
	const handleClose = () => {
		onClose();
	};

	return (
		<div
			className={cn(
				"bg-[#00000080] z-30 fixed transition-all h-screen w-screen",
				isOpen ? "inset-0" : "top-[-100%]",
			)}
		>
			<div className="flex justify-center items-center h-screen">
				<div className={cn("modal-box mx-auto mt-[-80px]", className)}>
					<form method="dialog">
						<button
							onClick={handleClose}
							className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
						>
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg">{title}</h3>
					<p className="py-4">{children}</p>
				</div>
			</div>
		</div>
	);
};
