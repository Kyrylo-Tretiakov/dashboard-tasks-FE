import { ITask } from "@/entities/task/model/task";

export interface IColumn {
	id: string;
	name: string;
	boardId: string;
	createdAt: string;
	updatedAt: string;
	tasks: ITask[];
}
