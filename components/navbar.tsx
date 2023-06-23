'use client';

import styles from "@/styles/navbar.module.scss";
import Link from "next/link";
import {useContext} from "react";
import {UserContext} from "@/contexts/auth";
import {UserContextType} from "@/types";

export default function Navbar() {
    const userContext = useContext<UserContextType>(UserContext);

    return (
        <div className={styles.topBar}>
            <div className={styles.right}>
                <h1>
                    <Link href='/'>E-Library</Link>
                </h1>
            </div>
            <div className={styles.left}>
                {!userContext.token && <Link href='/signin'>Sign In</Link>}
                <Link href='/cart'>Cart</Link>
            </div>
        </div>
    );
}
