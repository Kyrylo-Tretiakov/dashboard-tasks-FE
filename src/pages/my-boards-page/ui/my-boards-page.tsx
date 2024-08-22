"use client";
import { BoardItem, IBoard } from "@/entities/board";
import useFetch from "@/shared/api/use-fetch";
import { ApiRoutes, QueryKeys } from "@/shared/lib/constants";
import { useModal } from "@/shared/model/modalStore";
import withSignInToDb from "@/shared/model/with-signIn-to-db";
import { CanvasRevealEffect } from "@/shared/ui/canvas-reveal-effect";
import { Loader } from "@/shared/ui/loader";
import { EmptyBoard } from "@/widgets/empty-board";
import { useUser } from "@clerk/nextjs";
import { GrChapterAdd } from "react-icons/gr";

const MyBoardsPage = () => {
	const { onOpen } = useModal();
	const { user } = useUser();
	const { data: boards, isLoading } = useFetch({
		key: QueryKeys.Boards,
		id: user?.id as string,
		url: ApiRoutes.getAllBoards,
	});

	if (isLoading) return <Loader className="w-full h-full  bg-transparent" />;

	return (
		<div className="flex h-full w-full overflow-x-scroll no-scrollbar">
			{!boards || boards.length === 0 ? (
				<EmptyBoard />
			) : (
				<div className="flex mt-10  gap-10 px-10 py-4">
					{boards?.map((board: IBoard) => (
						<BoardItem key={board.boardName} board={board}>
							<CanvasRevealEffect
								animationSpeed={2.7}
								containerClassName="bg-emerald-900"
							/>
						</BoardItem>
					))}
					<div className="max-w-[300px] h-[350px] flex justify-center items-center flex-shrink-0">
						<button
							onClick={() => onOpen("createBoard")}
							className="btn btn-outline flex  mx-auto"
						>
							Create one more <GrChapterAdd />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default withSignInToDb(MyBoardsPage);
