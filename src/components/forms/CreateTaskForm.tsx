"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateTask } from "@/features/tasks/hooks";
import { Priority } from "@/features/tasks/types";
import styles from "./CreateTaskForm.module.css";

const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"], {
    message: "Priority is required",
  }),
});

type CreateTaskValues = z.infer<typeof createTaskSchema>;

type CreateTaskFormProps = {
  columnId: string;
  boardId: string;
};

const priorityOptions: Priority[] = ["LOW", "MEDIUM", "HIGH"];

export function CreateTaskForm({ columnId, boardId }: CreateTaskFormProps) {
  const createTask = useCreateTask(boardId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "MEDIUM",
    },
  });

  const onSubmit = async (values: CreateTaskValues) => {
    await createTask.mutateAsync({
      columnId,
      title: values.title,
      description: values.description?.trim() || undefined,
      priority: values.priority,
    });
    reset({
      title: "",
      description: "",
      priority: "MEDIUM",
    });
  };

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <p className={styles.label}>Create task</p>
        <h3>New task</h3>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.field}>
          <span>Title</span>
          <input type="text" placeholder="Implement endpoint test" {...register("title")} />
        </label>

        <label className={styles.field}>
          <span>Description</span>
          <textarea
            rows={3}
            placeholder="Optional task details"
            {...register("description")}
          />
        </label>

        <label className={styles.field}>
          <span>Priority</span>
          <select {...register("priority")}>
            {priorityOptions.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>

        {errors.title ? <p className={styles.error}>{errors.title.message}</p> : null}
        {errors.priority ? (
          <p className={styles.error}>{errors.priority.message}</p>
        ) : null}
        {createTask.isError ? (
          <p className={styles.error}>{createTask.error?.message}</p>
        ) : null}

        <button
          type="submit"
          className={styles.submit}
          disabled={createTask.isPending}
        >
          {createTask.isPending ? "Creating..." : "Create task"}
        </button>
      </form>
    </section>
  );
}
