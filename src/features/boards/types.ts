import { Column } from "@/features/columns/types";

export type Board = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type BoardDetails = Board & {
  columns: Column[];
};

export type CreateBoardInput = {
  title: string;
};
