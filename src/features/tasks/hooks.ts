"use client";

import { teamBoardApi } from "@/lib/api-slice";
import { MutationResult, useWrappedMutation } from "@/lib/rtk-query-helpers";
import { CreateTaskInput, Task } from "./types";

type DeleteTaskInput = {
  boardId: string;
  taskId: string;
};

type CreateTaskMutationInput = CreateTaskInput & {
  boardId: string;
};

export function useCreateTask(
  boardId: string,
): MutationResult<CreateTaskInput, Task> {
  const mutation = useWrappedMutation<CreateTaskMutationInput, Task>(
    teamBoardApi.useCreateTaskMutation(),
  );

  return {
    ...mutation,
    mutate: (payload) => mutation.mutate({ boardId, ...payload }),
    mutateAsync: (payload) => mutation.mutateAsync({ boardId, ...payload }),
  };
}

export function useDeleteTask(boardId: string): MutationResult<string, void> {
  const mutation = useWrappedMutation<DeleteTaskInput, void>(
    teamBoardApi.useDeleteTaskMutation(),
  );

  return {
    ...mutation,
    mutate: (taskId) => mutation.mutate({ boardId, taskId }),
    mutateAsync: (taskId) => mutation.mutateAsync({ boardId, taskId }),
  };
}
