'use client';
import { AppRoutes } from "@/shared/lib/constants";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { GiMoon } from "react-icons/gi";

export const Header = () => {
    const router = useRouter();

    return (
        <div className="navbar max-w-[1370px] my-2 mx-auto bg-neutral-100 rounded-3xl">
            <div className="flex-1">
                <button onClick={() => router.push(AppRoutes.home)} className="btn btn-ghost text-xl">IT'S MoonSoft <GiMoon size={18} /></button>
            </div>
            <div className="flex-none mr-4">
                <UserButton showName />
            </div>
        </div>
    );
}