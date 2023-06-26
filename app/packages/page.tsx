'use client'
import {useRouter} from "next/navigation";
import {UserContext} from "@/contexts/auth";
import {useContext, useEffect, useState} from "react";
import {PackageType, UserContextType} from "@/types";
import {fetchPackages} from "@/actions/actions";
import styles from '@/styles/packages.module.scss'

export default function MyPackages() {
    const {data: userData, setData: setUserData} = useContext<UserContextType>(UserContext);
    const router = useRouter()
    const [packages, setPackages] = useState<PackageType[]>([]);

    useEffect(() => {
        if (userData.token) {
            console.log("Hi")
            fetchPackages(userData.token)
                .then(response => {
                    setPackages(response.packages);
                });
        }
    }, [userData]);

    return (
        <div className={styles.page}>
            <h1>My Packages</h1>

            <ul>
                {packages.map(packageItem => (
                    <li key={packageItem.packageId}>
                        <p>Package ID: {packageItem.packageId}</p>
                        <p>Package Address: {packageItem.address}</p>
                        <ul>
                            {packageItem.books.map(item => (
                                <li key={item.productId}> {item.title} </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}
