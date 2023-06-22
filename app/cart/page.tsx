'use client';


import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "@/contexts/shopping";
import { BookType, ShoppingCartContextType } from "@/types";
import styles from "@/styles/cart.module.scss";

export default function Cart() {
    const [items, setItems] = useState<BookType[]>([]);
    const [totalValue, setTotalValue] = useState<number>(0);

    const shoppingCart = useContext<ShoppingCartContextType>(ShoppingCartContext);

    useEffect(() => {
        setItems(shoppingCart.items);
        setTotalValue(shoppingCart.totalValue);
    }, []);

    function clearItem(book: BookType) {
        shoppingCart.totalValue = shoppingCart.totalValue - shoppingCart.items.filter((item) => item.productId === book.productId).length * book.price;
        shoppingCart.items = shoppingCart.items.filter((item) => item.productId !== book.productId);

        setItems(shoppingCart.items);
        setTotalValue(shoppingCart.totalValue);
    }

    function increaseItem(book: BookType) {
        shoppingCart.items.push(book);
        shoppingCart.totalValue += book.price;

        setItems(shoppingCart.items);
        setTotalValue(shoppingCart.totalValue);
    }

    function decreaseItem(book: BookType) {
        for (let i = 0; i < shoppingCart.items.length; i++) {
            if (shoppingCart.items[i].productId === book.productId) {
                shoppingCart.items.splice(i, 1);
                shoppingCart.totalValue -= book.price;

                setItems(shoppingCart.items);
                setTotalValue(shoppingCart.totalValue);
                break;
            }
        }
    }

    console.log(shoppingCart)

    return (
        <div className={styles.page}>
            <h1>Cart</h1>
            <p>Total: ${totalValue}</p>

            <ul className={styles.items}>
                {items.map((item) => (
                    <li className={styles.item} key={item.productId}>
                        <p>{item.title}</p>
                        <p>${item.price}</p>
                        <div className={styles.btnGroup}>
                            <button className={styles.btn} onClick={() => decreaseItem(item)}>-</button>
                            <button className={styles.btn} onClick={() => clearItem(item)}>Remove</button>
                            <button className={styles.btn} onClick={() => increaseItem(item)}>+</button>
                        </div>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
}