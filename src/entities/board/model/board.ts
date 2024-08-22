import { IColumn } from "@/entities/column/model/column";

export interface IBoard {
	description: string;
	id: string;
	boardName: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
	columns?: IColumn[];
}
