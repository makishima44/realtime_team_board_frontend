"use client";

import { teamBoardApi } from "@/lib/api-slice";
import { MutationResult, useWrappedMutation } from "@/lib/rtk-query-helpers";
import { Column, CreateColumnInput } from "./types";

type DeleteColumnInput = {
  boardId: string;
  columnId: string;
};

export function useCreateColumn(
  boardId?: string,
): MutationResult<CreateColumnInput, Column> {
  void boardId;

  return useWrappedMutation(teamBoardApi.useCreateColumnMutation());
}

export function useDeleteColumn(boardId: string): MutationResult<string, void> {
  const mutation = useWrappedMutation<DeleteColumnInput, void>(
    teamBoardApi.useDeleteColumnMutation(),
  );

  return {
    ...mutation,
    mutate: (columnId) => mutation.mutate({ boardId, columnId }),
    mutateAsync: (columnId) => mutation.mutateAsync({ boardId, columnId }),
  };
}
