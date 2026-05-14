"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateBoard } from "@/features/boards/hooks";
import styles from "./CreateBoardForm.module.css";

const createBoardSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
});

type CreateBoardValues = z.infer<typeof createBoardSchema>;

export function CreateBoardForm() {
  const createBoard = useCreateBoard();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateBoardValues>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: CreateBoardValues) => {
    await createBoard.mutateAsync(values);
    reset();
  };

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <p className={styles.label}>Create board</p>
        <h2>New board</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.field}>
          <span>Title</span>
          <input
            type="text"
            placeholder="Sprint planning"
            {...register("title")}
          />
        </label>

        {errors.title ? (
          <p className={styles.error}>{errors.title.message}</p>
        ) : null}

        {createBoard.isError ? (
          <p className={styles.error}>{createBoard.error?.message}</p>
        ) : null}

        <button
          type="submit"
          className={styles.submit}
          disabled={createBoard.isPending}
        >
          {createBoard.isPending ? "Creating..." : "Create board"}
        </button>
      </form>
    </section>
  );
}
