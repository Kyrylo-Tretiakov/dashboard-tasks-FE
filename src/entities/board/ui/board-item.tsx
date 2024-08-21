'use client';
import { FC, useState } from "react"
import { IBoard } from "../model/board"
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/shared/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { MdSpaceDashboard } from "react-icons/md";

// export const BoardItem: FC<BoardItemProps> = ({ board }) => {
//     const router = useRouter();

//     return (
//         <div className="card w-96 h-max bg-base-100 cursor-pointer shadow-xl">
//             <div className="card-body">
//                 <h2 className="card-title">{board.name}</h2>
//                 <p>{board?.description ?? 'Board Description'}</p>
//                 <div className="card-actions justify-end">
//                     <button onClick={() => router.push(AppRoutes.board + "/125125")} className="btn btn-primary text-white w-[100px]">Go in</button>
//                 </div>
//             </div>
//         </div>
//     )
// };


export const BoardItem = ({
    board,
    children,
}: {
    board: any
    children?: React.ReactNode;
}) => {
    const [hovered, setHovered] = useState(false);
    const router = useRouter();
    
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="border flex-shrink-0 bg-white border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-[300px] w-full mx-auto p-4  h-[350px] relative"
        >
            <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full w-full absolute inset-0"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-[1">
                {!hovered ? <div className="text-center   flex-col group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
                    <MdSpaceDashboard size={40} />
                    <span className="text-lg font-bold">
                        {board.name}
                    </span>
                </div>
                    : <div className="dark:text-white  flex flex-col text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-[1] text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
                        <span className="text-center  mb-2 font-bold">
                            {board.name}
                        </span>
                        <span className="text-center mb-4 text-sm">
                            {board.description}
                        </span>
                        <button onClick={() => router.push(AppRoutes.board + '/123')} className="btn">Go to board</button>
                    </div>
                }
            </div>
        </div>
    );
};

const Icon = ({ className, ...rest }: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={className}
            {...rest}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
    );
};