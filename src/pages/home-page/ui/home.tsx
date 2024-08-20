'use client'

import { BoardItem } from "@/entities/board";
import { useModal } from "@/shared/model/modalStore";
import { EmptyBoard } from "@/widgets/empty-board";
import { GrChapterAdd } from "react-icons/gr";

const boards = [
    {
        name: 'Board 1',
    },
    {
        name: 'Board 2',
    },
    {
        name: 'Board 3',
    },
    {
        name: 'Board 4',
    },
]
const HomePage = () => {
    const { onOpen } = useModal();

    return (
        <div className="flex justify-center h-full">
            <EmptyBoard />
            {/* <div className="flex flex-wrap  gap-x-4 items-center px-10 py-4">
                {boards.map((board) => (
                    <BoardItem key={board.name} board={board} />
                ))}
                <div className="w-96">
                    <button onClick={() => onOpen('createBoard')} className="btn btn-outline flex  mx-auto">Create one more <GrChapterAdd /></button>
                </div>
            </div> */}
        </div>
    )
}

export default HomePage;