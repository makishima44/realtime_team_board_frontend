import { BoardDetails } from "@/features/boards/types";
import { BoardColumn } from "./BoardColumn";
import { CreateColumnForm } from "../forms/CreateColumnForm";
import styles from "./BoardView.module.css";

type BoardViewProps = {
  board: BoardDetails;
};

export function BoardView({ board }: BoardViewProps) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Board</p>
          <h1>{board.title}</h1>
          <p className={styles.meta}>Board ID: {board.id}</p>
        </div>
        <CreateColumnForm boardId={board.id} />
      </div>

      {board.columns.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No columns yet.</p>
          <span>Add a column to start creating tasks on this board.</span>
        </div>
      ) : (
        <div className={styles.columns}>
          {board.columns.map((column) => (
            <BoardColumn key={column.id} column={column} />
          ))}
        </div>
      )}
    </section>
  );
}
