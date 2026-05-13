import { Task } from "@/features/tasks/types";

export type Column = {
  id: string;
  boardId: string;
  title: string;
  position: number;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
};

export type CreateColumnInput = {
  boardId: string;
  title: string;
};
