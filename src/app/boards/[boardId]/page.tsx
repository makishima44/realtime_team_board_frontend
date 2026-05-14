"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BoardView } from "@/components/board/BoardView";
import { useBoard } from "@/features/boards/hooks";
import styles from "./page.module.css";

export default function BoardPage() {
  const params = useParams<{ boardId: string }>();
  const boardId = params.boardId;
  const { data: board, isLoading, isError, error } = useBoard(boardId);

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <Link href="/" className={styles.backLink}>
          Back to boards
        </Link>
      </div>

      {isLoading ? <p className={styles.state}>Loading board...</p> : null}

      {isError ? (
        <p className={styles.error}>Failed to load board: {error?.message}</p>
      ) : null}

      {board ? <BoardView board={board} /> : null}
    </main>
  );
}
