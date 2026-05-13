"use client";

import { Task } from "@/features/tasks/types";
import { useDeleteTask } from "@/features/tasks/hooks";
import styles from "./TaskCard.module.css";

type TaskCardProps = {
  task: Task;
  boardId: string;
};

const priorityLabel: Record<Task["priority"], string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

export function TaskCard({ task, boardId }: TaskCardProps) {
  const deleteTask = useDeleteTask(boardId);

  return (
    <article className={styles.card} data-priority={task.priority}>
      <div className={styles.header}>
        <span className={styles.priority}>{priorityLabel[task.priority]}</span>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => deleteTask.mutate(task.id)}
          disabled={deleteTask.isPending}
        >
          {deleteTask.isPending ? "Deleting..." : "Delete"}
        </button>
      </div>

      <div className={styles.content}>
        <h3>{task.title}</h3>
        <p>{task.description?.trim() || "No description provided."}</p>
      </div>

      <footer className={styles.footer}>Task ID: {task.id}</footer>
    </article>
  );
}
