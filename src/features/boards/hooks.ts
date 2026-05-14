"use client";

import { skipToken } from "@reduxjs/toolkit/query";
import { teamBoardApi } from "@/lib/api-slice";
import {
  MutationResult,
  toError,
  useWrappedMutation,
} from "@/lib/rtk-query-helpers";
import { Board, CreateBoardInput } from "./types";

export function useBoards() {
  const result = teamBoardApi.useGetBoardsQuery();

  return {
    ...result,
    error: toError(result.error),
    isError: result.isError,
    isLoading: result.isLoading,
  };
}

export function useBoard(boardId: string) {
  const result = teamBoardApi.useGetBoardQuery(boardId || skipToken);

  return {
    ...result,
    error: toError(result.error),
    isError: result.isError,
    isLoading: result.isLoading,
  };
}

export function useCreateBoard(): MutationResult<CreateBoardInput, Board> {
  return useWrappedMutation(teamBoardApi.useCreateBoardMutation());
}
