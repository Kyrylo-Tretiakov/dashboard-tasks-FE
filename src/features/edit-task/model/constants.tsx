import { EpicType, PriorityType } from "@/entities/task/model/task";
import { EpicIcon } from "@/shared/ui/epic-icon";
import { PriorityIcon } from "@/shared/ui/priority-icon";

export const priorityOptions = [
	{
		value: PriorityType.Low,
		node: (
			<div className="flex items-center">
				<PriorityIcon type={PriorityType.Low} />
				<span className="ml-2"> Low</span>
			</div>
		),
	},
	{
		value: PriorityType.Medium,
		node: (
			<div className="flex items-center">
				<PriorityIcon type={PriorityType.Medium} />
				<span className="ml-2"> Medium</span>
			</div>
		),
	},
	{
		value: PriorityType.High,
		node: (
			<div className="flex items-center">
				<PriorityIcon type={PriorityType.High} />
				<span className="ml-2"> High</span>
			</div>
		),
	},
	{
		value: PriorityType.Critical,
		node: (
			<div className="flex items-center">
				<PriorityIcon type={PriorityType.Critical} />
				<span className="ml-2"> Critical</span>
			</div>
		),
	},
];

export const epicOptions = [
	{
		value: EpicType.Epic,
		node: (
			<div className="flex items-center">
				<EpicIcon type={EpicType.Epic} />
				<span className="ml-2"> Epic</span>
			</div>
		),
	},
	{
		value: EpicType.Bug,
		node: (
			<div className="flex items-center">
				<EpicIcon type={EpicType.Bug} />
				<span className="ml-2"> Bug</span>
			</div>
		),
	},
	{
		value: EpicType.Task,
		node: (
			<div className="flex items-center">
				<EpicIcon type={EpicType.Task} />
				<span className="ml-2"> Task</span>
			</div>
		),
	},
];
