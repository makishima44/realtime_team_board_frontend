"use client";

import { Column } from "@/features/columns/types";
import { useDeleteColumn } from "@/features/columns/hooks";
import { TaskCard } from "./TaskCard";
import { CreateTaskForm } from "../forms/CreateTaskForm";
import styles from "./BoardColumn.module.css";

type BoardColumnProps = {
  column: Column;
};

export function BoardColumn({ column }: BoardColumnProps) {
  const deleteColumn = useDeleteColumn(column.boardId);

  return (
    <article className={styles.column}>
      <div className={styles.header}>
        <div>
          <h2>{column.title}</h2>
          <p>Column ID: {column.id}</p>
        </div>

        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => deleteColumn.mutate(column.id)}
          disabled={deleteColumn.isPending}
        >
          {deleteColumn.isPending ? "Deleting..." : "Delete"}
        </button>
      </div>

      <CreateTaskForm columnId={column.id} boardId={column.boardId} />

      {column.tasks.length === 0 ? (
        <div className={styles.emptyTasks}>
          <p>No tasks in this column.</p>
          <span>Create one below to verify the backend response.</span>
        </div>
      ) : (
        <div className={styles.tasks}>
          {column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} boardId={column.boardId} />
          ))}
        </div>
      )}
    </article>
  );
}
