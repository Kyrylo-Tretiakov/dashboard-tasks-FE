'use client';
import Image from "next/image";
import HeroBg from "../../../../public/bg.jpg";
import { useModal } from "@/shared/model/modalStore";
import { MdSpaceDashboard } from "react-icons/md";

export const EmptyBoard = () => {
    const { onOpen } = useModal();

    return (
        <div className="hero bg-neutral-100 z-10 rounded-none relative" >
            <Image src={HeroBg} layout="fill" className="rounded-xl" objectFit="cover" alt="heroImg" />
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5">Looks like you don't have any boards, let's create one.</p>
                    <button onClick={() => onOpen('createBoard')} className="btn btn-primary">Create Board <MdSpaceDashboard /></button>
                </div>
            </div>
        </div>
    )
}