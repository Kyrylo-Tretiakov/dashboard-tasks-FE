export enum PriorityType {
	Low = "Low",
	Medium = "Medium",
	High = "High",
	Critical = "Critical",
}

export enum EpicType {
	Task = "Task",
	Epic = "Epic",
	Bug = "Bug",
}

export interface ITask {
	id: string;
	name: string;
	description: string;
	priority: PriorityType;
	epic: EpicType;
	position: number;
	assigneeId: string;
	assignee: string;
	columnId: string;
	createdAt: string;
	updatedAt: string;
}
