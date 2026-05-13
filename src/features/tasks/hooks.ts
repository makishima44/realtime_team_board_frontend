"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { boardKeys } from "@/features/boards/hooks";
import { CreateTaskInput } from "./types";
import { tasksApi } from "./api";

export function useCreateTask(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTaskInput) => tasksApi.createTask(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: boardKeys.detail(boardId) });
    },
  });
}

export function useDeleteTask(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => tasksApi.deleteTask(taskId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: boardKeys.detail(boardId) });
    },
  });
}
