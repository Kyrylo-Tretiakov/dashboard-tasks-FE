'use client'

import { BoardItem } from "@/entities/board";
import { useModal } from "@/shared/model/modalStore";
import { CanvasRevealEffect } from "@/shared/ui/canvas-reveal-effect";
import { EmptyBoard } from "@/widgets/empty-board";
import { GrChapterAdd } from "react-icons/gr";
import { MdSpaceDashboard } from "react-icons/md";

const boards = [
    {
        name: 'Board 1',
        description: "It's cool dashboard for managment !"
    },
    {
        name: 'Board 2',
        description: "It's cool dashboard for managment !"
    },
]
const MyBoardsPage = () => {
    const { onOpen } = useModal();

    return (
        <div className="flex h-full w-full overflow-x-scroll no-scrollbar">
            {/* <EmptyBoard /> */}
            <div className="flex mt-10  gap-10 px-10 py-4">
                {boards.map((board, index) => (
                    <BoardItem key={board.name} board={board} >
                        <CanvasRevealEffect
                            animationSpeed={2.7}
                            containerClassName="bg-emerald-900"
                        />
                    </BoardItem>
                ))}
                <div className="max-w-[300px] h-[350px] flex justify-center items-center flex-shrink-0">
                    <button onClick={() => onOpen('createBoard')} className="btn btn-outline flex  mx-auto">Create one more <GrChapterAdd /></button>
                </div>
            </div>
        </div>
    )
}

export default MyBoardsPage;