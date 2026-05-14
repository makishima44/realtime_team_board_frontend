import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./api-client";
import { Board, BoardDetails, CreateBoardInput } from "@/features/boards/types";
import { Column, CreateColumnInput } from "@/features/columns/types";
import { CreateTaskInput, Task } from "@/features/tasks/types";

export const teamBoardApi = createApi({
  reducerPath: "teamBoardApi",
  baseQuery,
  tagTypes: ["Boards", "Board"],
  endpoints: (builder) => ({
    getBoards: builder.query<Board[], void>({
      query: () => "/boards",
      providesTags: ["Boards"],
    }),
    getBoard: builder.query<BoardDetails, string>({
      query: (boardId) => `/boards/${boardId}`,
      providesTags: (_result, _error, boardId) => [{ type: "Board", id: boardId }],
    }),
    createBoard: builder.mutation<Board, CreateBoardInput>({
      query: (body) => ({
        url: "/boards",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Boards"],
    }),
    createColumn: builder.mutation<Column, CreateColumnInput>({
      query: (body) => ({
        url: "/columns",
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { boardId }) => [
        { type: "Board", id: boardId },
      ],
    }),
    deleteColumn: builder.mutation<void, { boardId: string; columnId: string }>({
      query: ({ columnId }) => ({
        url: `/columns/${columnId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { boardId }) => [
        { type: "Board", id: boardId },
      ],
    }),
    createTask: builder.mutation<Task, CreateTaskInput & { boardId: string }>({
      query: (payload) => ({
        url: "/tasks",
        method: "POST",
        body: {
          columnId: payload.columnId,
          title: payload.title,
          description: payload.description,
          priority: payload.priority,
        },
      }),
      invalidatesTags: (_result, _error, { boardId }) => [
        { type: "Board", id: boardId },
      ],
    }),
    deleteTask: builder.mutation<void, { boardId: string; taskId: string }>({
      query: ({ taskId }) => ({
        url: `/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { boardId }) => [
        { type: "Board", id: boardId },
      ],
    }),
  }),
});
