'use client';

import styles from "@/styles/navbar.module.scss";
import Link from "next/link";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/contexts/auth";
import {UserContextType} from "@/types";

export default function Navbar() {
    const {data: userData} = useContext<UserContextType>(UserContext);
    const [signedin, setSignedin] = useState<boolean>(false);

    useEffect(() => {
        setSignedin(userData.token !== null);
    }, [userData.token]);

    return (
        <div className={styles.topBar}>
            <div className={styles.right}>
                <h1>
                    <Link href='/'>E-Library</Link>
                </h1>
            </div>
            <div className={styles.left}>
                {!signedin && <Link href='/signin' id="signin">Sign In</Link>}
                {signedin && <Link href='/packages' id="packages">Track</Link>}
                <Link href='/cart' id="cart">Cart</Link>
            </div>
        </div>
    );
}
