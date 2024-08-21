'use client';
import { AppRoutes } from "@/shared/lib/constants";
import { cn } from "@/shared/lib/tailwind-merge";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { GiMoon } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { PiUsersThreeBold } from "react-icons/pi";
import { IoMdArrowRoundBack } from "react-icons/io";

export const Header = () => {
    const router = useRouter();
    const pathname = usePathname()

    return (
        <div className="navbar max-w-[1370px] justify-between my-2 mx-auto bg-neutral-100 rounded-3xl">
            <div className="">
                {pathname?.includes('/board/') ?
                    <button
                        onClick={() => router.back()} className="btn btn-ghost text-xl"
                    >
                        <IoMdArrowRoundBack size={19} />  Back
                    </button>

                    : <button
                        onClick={() => router.push(AppRoutes.myBoards)} className="btn btn-ghost text-xl"
                    >
                        IT'S MoonSoft <GiMoon size={18} />
                    </button>}
            </div>
            <div className="flex flex-1 items-center justify-center  gap-x-4">
                <button
                    onClick={() => router.push(AppRoutes.myBoards)}
                    className={cn("btn", pathname?.includes(AppRoutes.myBoards) ? 'btn-neutral' : 'btn-ghost')}
                >
                    My Boards <MdDashboard size={18} />
                </button>
                <button
                    onClick={() => router.push(AppRoutes.invitedBoards)}
                    className={cn("btn", pathname?.includes(AppRoutes.invitedBoards) ? 'btn-neutral' : 'btn-ghost')}
                >
                    Invited Boards <PiUsersThreeBold size={20} />
                </button>
            </div>

            <div className="flex-none mr-4">
                <UserButton showName />
            </div>
        </div>
    );
}