"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { boardKeys } from "@/features/boards/hooks";
import { columnsApi } from "./api";
import { CreateColumnInput } from "./types";

export function useCreateColumn(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateColumnInput) => columnsApi.createColumn(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: boardKeys.detail(boardId) });
    },
  });
}

export function useDeleteColumn(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (columnId: string) => columnsApi.deleteColumn(columnId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: boardKeys.detail(boardId) });
    },
  });
}
