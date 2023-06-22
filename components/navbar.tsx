import styles from "@/styles/navbar.module.scss";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className={styles.topBar}>
            <div className={styles.right}>
                <h1>
                    <Link href='/'>E-Library</Link>
                </h1>
            </div>
            <div className={styles.left}>
                <Link href='/login'>Login</Link>
                <Link href='/cart'>Cart</Link>
            </div>
        </div>
    );
}
