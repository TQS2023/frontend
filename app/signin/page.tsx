'use client';

import {useContext, useState} from "react";
import {login} from "@/actions/actions";
import Link from "next/link";
import styles from "@/styles/signin.module.scss";
import {UserContextType} from "@/types";
import {UserContext} from "@/contexts/auth";
import {useRouter} from "next/navigation";

export default function SignIn() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const {data: userData, setData: setUserData} = useContext<UserContextType>(UserContext);

    const router = useRouter();

    if (userData.token) {
        router.push('/');
    }

    return (
        <div className={styles.page}>
            <h1>Signin</h1>
            <form
                className={styles.form}
                onSubmit={ev => {
                ev.preventDefault();
                login(email, password).then(response => {
                    if (response === null || !response.success) {
                        alert('Invalid credentials');
                    } else {
                        setUserData({ token:  response.token });
                        router.push('/');
                    }
                });
            }}>
                <label className={styles.label}>
                    <p>Email</p>
                    <input className={styles.input} type="email" name="email" placeholder="Email" onChange={ev => setEmail(ev.target.value)} />
                </label>
                <label className={styles.label}>
                    <p>Password</p>
                    <input className={styles.input} type="password" name="password" placeholder="Password" onChange={ev => setPassword(ev.target.value)} />
                </label>

                <button type="submit">Sign in</button>
                <Link className={styles.link} href="/signup">Sign up instead</Link>
            </form>
        </div>
    );
}
