'use client';
import { FC } from "react"
import { IBoard } from "../model/board"

interface BoardItemProps {
    board: IBoard;
}

export const BoardItem: FC<BoardItemProps> = ({ board }) => {
    return (
        <div className="card w-96 bg-base-100 cursor-pointer shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{board.name}</h2>
                <p>{board?.description ?? 'Board Description'}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary text-white w-[100px]">Go in</button>
                </div>
            </div>
        </div>
    )
};