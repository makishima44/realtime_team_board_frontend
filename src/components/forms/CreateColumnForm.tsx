"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateColumn } from "@/features/columns/hooks";
import styles from "./CreateColumnForm.module.css";

const createColumnSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
});

type CreateColumnValues = z.infer<typeof createColumnSchema>;

type CreateColumnFormProps = {
  boardId: string;
};

export function CreateColumnForm({ boardId }: CreateColumnFormProps) {
  const createColumn = useCreateColumn(boardId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateColumnValues>({
    resolver: zodResolver(createColumnSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: CreateColumnValues) => {
    await createColumn.mutateAsync({
      boardId,
      ...values,
    });
    reset();
  };

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <p className={styles.label}>Create column</p>
        <h2>Add column</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.field}>
          <span>Title</span>
          <input type="text" placeholder="Todo" {...register("title")} />
        </label>

        {errors.title ? (
          <p className={styles.error}>{errors.title.message}</p>
        ) : null}

        {createColumn.isError ? (
          <p className={styles.error}>{createColumn.error?.message}</p>
        ) : null}

        <button
          type="submit"
          className={styles.submit}
          disabled={createColumn.isPending}
        >
          {createColumn.isPending ? "Creating..." : "Create column"}
        </button>
      </form>
    </section>
  );
}
