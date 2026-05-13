import { apiClient } from "@/lib/api-client";
import { Board, BoardDetails, CreateBoardInput } from "./types";

export const boardsApi = {
  getBoards: () => apiClient.get<Board[]>("/boards"),
  getBoard: (boardId: string) => apiClient.get<BoardDetails>(`/boards/${boardId}`),
  createBoard: (payload: CreateBoardInput) =>
    apiClient.post<Board, CreateBoardInput>("/boards", payload),
};
