import Link from "next/link";
import { Board } from "@/features/boards/types";
import styles from "./BoardList.module.css";

type BoardListProps = {
  boards: Board[];
};

export function BoardList({ boards }: BoardListProps) {
  if (boards.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No boards yet.</p>
        <span>Create the first board to start testing CRUD endpoints.</span>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {boards.map((board) => (
        <li key={board.id}>
          <Link href={`/boards/${board.id}`} className={styles.card}>
            <div>
              <h3>{board.title}</h3>
              <p>ID: {board.id}</p>
            </div>
            <span>Open board</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
