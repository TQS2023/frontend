import styles from "@/styles/book.module.scss";
import {BookType} from "@/types";

export default function Book({ book: { height, color, title }, onClick }: { book: BookType, onClick: () => void }) {
    return (
        <div className={styles.book} onClick={onClick} style={{
            height: `${height}%`,
            backgroundColor: color
        }}>
            <div className={styles.tooltipText}>{ title }</div>
        </div>
    )
}