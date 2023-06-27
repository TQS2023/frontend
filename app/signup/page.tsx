'use client';

import {useContext, useEffect, useState} from "react";
import {fetchPickupPoints, register} from "@/actions/actions";
import Link from "next/link";
import styles from "@/styles/signup.module.scss";
import {PickupPointType, UserContextType} from "@/types";
import {UserContext} from "@/contexts/auth";
import {useRouter} from "next/navigation";

export default function SignUp() {
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [creditCardNumber, setCreditCardNumber] = useState("");
    const [creditCardValidity, setCreditCardValidity] = useState("");
    const [creditCardCVC, setCreditCardCVC] = useState("");
    const [preferredPickupPointId, setPreferredPickupPointId] = useState("");

    const [pickupPoints, setPickupPoints] = useState<PickupPointType[]>([]);

    const {data: userData, setData: setUserData} = useContext<UserContextType>(UserContext);

    const router = useRouter();

    useEffect(() => {
        fetchPickupPoints()
            .then(res => {
                console.log(res)
                setPickupPoints(res);
            })
    },  []);

    if (userData.token) {
        router.push("/");
    }

    return (
        <div className={styles.page}>
            <h1>Signin</h1>
            <form
                className={styles.form}
                onSubmit={ev => {
                ev.preventDefault();

                register({
                    password,
                    address,
                    email,
                    creditCardNumber,
                    creditCardValidity: parseInt(creditCardValidity),
                    creditCardCVC,
                    preferredPickupPointId
                }).then(res => {
                    if (res === null || !res.success) {
                        alert("Error registering");
                    } else {
                        setUserData({ token: res.token });
                        router.push("/");
                    }
                });
            }}>
                <label className={styles.label}>
                    <p>Email</p>
                    <input className={styles.input} type="text" placeholder="Email" value={email} onChange={ev => setEmail(ev.target.value)}/>
                </label>
                <label className={styles.label}>
                    <p>Password</p>
                    <input className={styles.input} type="password" placeholder="Password" value={password} onChange={ev => setPassword(ev.target.value)}/>
                </label>
                <label className={styles.label}>
                    <p>Address</p>
                    <input className={styles.input} type="text" placeholder="Address" value={address} onChange={ev => setAddress(ev.target.value)}/>
                </label>
                <label className={styles.label}>
                    <p>Credit card number</p>
                    <input className={styles.input} type="text" placeholder="Credit card number" value={creditCardNumber} onChange={ev => setCreditCardNumber(ev.target.value)}/>
                </label>
                <label className={styles.label}>
                    <p>Credit card validity</p>
                    <input className={styles.input} type="text" placeholder="Credit card validity" value={creditCardValidity} onChange={ev => setCreditCardValidity(ev.target.value)}/>
                </label>
                <label className={styles.label}>
                    <p>Credit card CVC</p>
                    <input className={styles.input} type="text" placeholder="Credit card CVC" value={creditCardCVC} onChange={ev => setCreditCardCVC(ev.target.value)}/>
                </label>
                <label className={styles.label}>
                    <p>Preferred pickup point id</p>
                    <select name="preferredPickupPointId" className={styles.input} value={preferredPickupPointId} onChange={ev => setPreferredPickupPointId(ev.target.value)}>
                        {pickupPoints.map(pickupPoint => (
                            <option key={pickupPoint.pickupPointId} value={pickupPoint.pickupPointId}>{pickupPoint.name}</option>
                        ))}
                    </select>
                </label>

                <button type="submit">Sign up</button>
                <Link className={styles.link} href="/signin">Sign in instead</Link>
            </form>
        </div>
    );
}
