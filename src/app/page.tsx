"use client";

import { BoardList } from "@/components/board/BoardList";
import { CreateBoardForm } from "@/components/forms/CreateBoardForm";
import { useBoards } from "@/features/boards/hooks";
import styles from "./page.module.css";

export default function HomePage() {
  const { data: boards, isLoading, isError, error } = useBoards();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>Manual CRUD Playground</p>
          <h1>Realtime Team Board</h1>
          <p className={styles.description}>
            Lightweight frontend for testing boards, columns, and tasks against
            the existing backend API.
          </p>
        </div>
        <div className={styles.heroCard}>
          <span>Backend API</span>
          <strong>http://localhost:4000</strong>
          <p>Create boards here and open them to manage columns and tasks.</p>
        </div>
      </section>

      <section className={styles.grid}>
        <CreateBoardForm />

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <p className={styles.panelLabel}>Boards</p>
              <h2>Available boards</h2>
            </div>
          </div>

          {isLoading ? (
            <p className={styles.state}>Loading boards...</p>
          ) : null}

          {isError ? (
            <p className={styles.error}>
              Failed to load boards: {error?.message}
            </p>
          ) : null}

          {!isLoading && !isError ? <BoardList boards={boards ?? []} /> : null}
        </div>
      </section>
    </main>
  );
}
