'use client';

import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "@/contexts/shopping";
import {BookType, ShoppingCartContextType, UserContextType} from "@/types";
import styles from "@/styles/cart.module.scss";
import {order} from "@/actions/actions";
import {useRouter} from "next/navigation";
import {UserContext} from "@/contexts/auth";

export default function Cart() {
    const [items, setItems] = useState<BookType[]>([]);
    const [totalValue, setTotalValue] = useState<number>(0);

    const {data: cartData, setData: setCartData} = useContext<ShoppingCartContextType>(ShoppingCartContext);
    const {data: userData} = useContext<UserContextType>(UserContext);

    const router = useRouter();

    useEffect(() => {
        setItems(cartData.items);
        setTotalValue(cartData.totalValue);
    }, [cartData]);

    function clearItem(book: BookType) {
        setCartData({
            totalValue: cartData.totalValue - cartData.items.filter((item) => item.productId === book.productId).length * book.price,
            items: cartData.items.filter((item) => item.productId !== book.productId)
        })
        setItems(cartData.items);
        setTotalValue(cartData.totalValue);
    }

    function increaseItem(book: BookType) {
        setCartData({
            totalValue: cartData.totalValue + book.price,
            items: [...cartData.items, book]
        })

        setItems(cartData.items);
        setTotalValue(cartData.totalValue);
    }

    function decreaseItem(book: BookType) {
        for (let i = 0; i < cartData.items.length; i++) {
            if (cartData.items[i].productId === book.productId) {
                setCartData({
                    totalValue: cartData.totalValue - book.price,
                    items: [...cartData.items.slice(0, i), ...cartData.items.slice(i + 1)]
                });

                setItems(cartData.items);
                setTotalValue(cartData.totalValue);
                break;
            }
        }
    }

    return (
        <div className={styles.page}>
            <h1>Cart</h1>
            <p>Total: ${totalValue}</p>

            <ul className={styles.items} id="cart">
                {items.map((item) => (
                    <li className={styles.item} key={item.productId}>
                        <p>{item.title}</p>
                        <p>${item.price}</p>
                        <div className={styles.btnGroup}>
                            <button className={styles.btn} onClick={() => decreaseItem(item)}>-</button>
                            <button className={styles.btn + " removeFromCart"} onClick={() => clearItem(item)}>Remove</button>
                            <button className={styles.btn} onClick={() => increaseItem(item)}>+</button>
                        </div>
                        <hr />
                    </li>
                ))}
            </ul>

            {userData.token && (
                <button onClick={() => {
                    order(userData.token!, cartData.items);
                    setCartData({
                        totalValue: 0,
                        items: []
                    });
                    router.push("/");
                }}>Checkout</button>
            )}
        </div>
    );
}