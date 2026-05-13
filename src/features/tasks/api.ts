import { apiClient } from "@/lib/api-client";
import { CreateTaskInput, Task } from "./types";

export const tasksApi = {
  createTask: (payload: CreateTaskInput) =>
    apiClient.post<Task, CreateTaskInput>("/tasks", payload),
  deleteTask: (taskId: string) => apiClient.delete<void>(`/tasks/${taskId}`),
};
