"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { boardsApi } from "./api";
import { CreateBoardInput } from "./types";

export const boardKeys = {
  all: ["boards"] as const,
  detail: (boardId: string) => ["boards", boardId] as const,
};

export function useBoards() {
  return useQuery({
    queryKey: boardKeys.all,
    queryFn: boardsApi.getBoards,
  });
}

export function useBoard(boardId: string) {
  return useQuery({
    queryKey: boardKeys.detail(boardId),
    queryFn: () => boardsApi.getBoard(boardId),
    enabled: Boolean(boardId),
  });
}

export function useCreateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBoardInput) => boardsApi.createBoard(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: boardKeys.all });
    },
  });
}
