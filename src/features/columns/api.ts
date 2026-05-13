import { apiClient } from "@/lib/api-client";
import { Column, CreateColumnInput } from "./types";

export const columnsApi = {
  createColumn: (payload: CreateColumnInput) =>
    apiClient.post<Column, CreateColumnInput>("/columns", payload),
  deleteColumn: (columnId: string) => apiClient.delete<void>(`/columns/${columnId}`),
};
