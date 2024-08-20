'use client';

import React, { FC } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/shared/lib/tailwind-merge";
import { useModal } from "@/shared/model/modalStore";

interface TaskProps {
    text: string;
    isDragging: boolean;
}

export const Task: FC<TaskProps> = ({ text, isDragging }) => {
    const { user } = useUser();
    const { onOpen } = useModal();

    return (
        <div className=" mx-auto">
            <div onClick={() => onOpen('editTask')} className={cn("relative overflow-hidden h-full w-full min-w-[300px] cursor-pointer rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-100", isDragging ? 'opacity-[0.5]' : 'opacity-1'
            )}>
                <div className=" p-4">
                    <h2 className="font-bold  text-lg text-zinc-700">
                        {text}
                    </h2>
                    <div className="flex flex-row justify-between items-center mt-4">
                        <span className="text-sm text-gray-500">{blogContent.date}</span>
                        <Image src={user?.imageUrl as string} className="rounded-xl" width={25} height={25} alt="user image" />
                    </div>
                </div>
            </div>
        </div >
    )
}



const blogContent = {
    slug: "amazing-tailwindcss-grid-layouts",
    author: "Manu Arora",
    date: "28th March, 2023",
    title: "Amazing Tailwindcss Grid Layout Examples",
    description:
        "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
    image: "/demo/thumbnail.png",
    authorAvatar: "/manu.png",
};
