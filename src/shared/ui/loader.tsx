"use client";

import { cn } from "../lib/tailwind-merge";

export const Loader = ({ className }: { className?: string }) => (
	<div
		className={cn(
			"flex flex-col bg-white items-center justify-center h-screen w-screen",
			className,
		)}
	>
		<span className="loading loading-infinity w-[100px]"></span>
		<h1 className="text-2xl font-bold">Launching App</h1>
	</div>
);
