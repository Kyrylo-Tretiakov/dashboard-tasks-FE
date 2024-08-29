"use client";
import { Dialog } from "@/shared/ui/dialog";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModal } from "@/shared/model/modalStore";
import { TaskDetails } from "./task-details";
import { Attachments } from "./attachments";
import { Comments } from "./comments";
import useMutate from "@/shared/api/use-mutate";
import { ApiRoutes, HttpMethods, QueryKeys } from "@/shared/lib/constants";
import useFetch from "@/shared/api/use-fetch";
import { Loader } from "@/shared/ui/loader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";
import { EditableInput } from "@/shared/ui/editable-input";

type Inputs = {
    taskDescription: string;
};

const editBoardSchema = yup.object().shape({
    taskDescription: yup.string().required("This field is Required").min(4),
    taskEpic: yup
        .object({
            value: yup.string(),
        })
        .optional(),
    taskPriority: yup
        .object({
            value: yup.string(),
        })
        .optional(),
    taskAssigne: yup
        .object({
            value: yup.string(),
        })
        .optional(),
});

export const EditTaskModal = () => {
    const methods = useForm({
        resolver: yupResolver(editBoardSchema),
        mode: "onChange",
    });
    const { data, onClose } = useModal();
    const { taskId } = data;
    const queryClient = useQueryClient();
    const params = useParams();
    const { register } = methods;
    const taskDescription = methods.watch("taskDescription");

    const { data: task, isLoading } = useFetch({
        key: `${QueryKeys.Task}`,
        id: taskId,
        url: ApiRoutes.getTaskById + taskId,
    });

    const { mutate: upateTask } = useMutate({
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.Task, taskId] });
        },
    });
    const { mutate: deleteTask } = useMutate({
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.Board, params?.boardId],
            });
        },
    });

    useEffect(() => {
        methods.setValue("taskDescription", task?.description);
    }, [task]);

    const handleSaveDescription = async (e: any) => {
        e.preventDefault();
        if (task?.description === taskDescription) return;
        try {
            await upateTask({
                url: ApiRoutes.updateTask,
                method: HttpMethods.PUT,
                body: {
                    taskId: task?.id,
                    taskDescription,
                },
            });
            toast.success("Description Saved!");
        } catch (error) {
            toast.error("Something went wrong while saving description");
        }
    };

    const handleEditTaskName = async (newName: string) => {
        if (newName === task?.name) return;
        try {
            await upateTask({
                url: ApiRoutes.updateTask,
                method: HttpMethods.PUT,
                body: {
                    taskId: task?.id,
                    name: newName,
                },
            });
        } catch (error) {
            toast.error("Something went wrong while editing name");
        }
    };

    const handleDeleteTask = async () => {
        await deleteTask({
            url: ApiRoutes.deleteTask,
            method: HttpMethods.DELETE,
            body: {
                taskId,
            },
        });
        onClose();
    };

    return (
        <Dialog className="max-w-[900px] min-h-[400px]" title="">
            {isLoading ? (
                <div className="max-w-[900px] min-h-[400px]">
                    <span className="loading loading-infinity min-w-[100px]  ml-[360px]  mt-[150px]" />
                </div>
            ) : (
                <FormProvider {...methods}>
                    <div className="flex items-center gap-x-6  mb-4">
                        <EditableInput
                            className="text-3xl text-slate-600 font-bold"
                            defaultValue={task?.name}
                            onSubmit={handleEditTaskName}
                            tooltipPlacement="top"
                            tooltipText="Click to edit Task Name"
                        />
                        <FaRegTrashAlt
                            onClick={handleDeleteTask}
                            className="hover:opacity-[0.7] cursor-pointer"
                            color="red"
                            size={20}
                        />
                    </div>
                    <form className="flex w-full h-full items-start py-4">
                        <div className="w-full flex flex-col">
                            <div className="flex flex-col mb-4 relative">
                                <span className="font-semibold mb-2">Task Description</span>
                                <textarea
                                    {...register("taskDescription")}
                                    placeholder="Write your description here"
                                    className="textarea textarea-bordered textarea-md  min-h-[130px] w-full"
                                />
                                {taskDescription?.length > 5 && (
                                    <div className="flex items-center gap-x-2 absolute bottom-2 right-2">
                                        <button
                                            disabled={task?.description === taskDescription}
                                            onClick={(e) => handleSaveDescription(e)}
                                            className="btn btn-sm btn-primary text-white"
                                        >
                                            Save
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col items-start">
                                <Attachments />
                                <div className="flex items-center gap-x-4">
                                    <div className="skeleton h-32 w-32" />
                                    <div className="skeleton h-32 w-32" />
                                </div>
                            </div>
                            <div className="divider" />
                            <Comments />
                        </div>
                        <div className="divider divider-horizontal" />
                        <TaskDetails task={task} />
                    </form>
                </FormProvider>
            )}
        </Dialog>
    );
};
