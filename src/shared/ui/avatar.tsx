"use client";

import Image from "next/image";
import { FC } from "react";
import { cn } from "../lib/tailwind-merge";

interface AvatarProps {
	url: string;
	className?: string;
}

export const Avatar: FC<AvatarProps> = ({ url, className }) => {
	return (
		<Image
			src={url as string}
			className={cn("rounded-xl", className)}
			width={25}
			height={25}
			alt="user image"
		/>
	);
};
