export type Priority = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
  id: string;
  columnId: string;
  title: string;
  description: string | null;
  priority: Priority;
  position: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskInput = {
  columnId: string;
  title: string;
  description?: string;
  priority: Priority;
};
