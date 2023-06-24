'use client';

import styles from '@/styles/home.module.scss';
import { useContext, useEffect, useState } from "react";
import Book from "@/components/book";
import { BookType, ShoppingCartContextType } from "@/types";
import { fetchAllProducts } from "@/actions/actions";
import { FaShoppingCart } from "react-icons/fa";
import { ShoppingCartContext } from "@/contexts/shopping";


export default function Home() {
    const [scroll, setScroll] = useState(0);
    const [books, setBooks] = useState<BookType[]>([]);
    const [selected, setSelected] = useState<number | null>(null);

    const shoppingCart = useContext<ShoppingCartContextType>(ShoppingCartContext);

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

    useEffect(() => {
        fetchAllProducts().then(res => {
            setBooks(res);
        })

        document.addEventListener('wheel', (e) => {
            const scroller = document.getElementById('scroller');
            if (scroller === null) return;

            const scrollMin = window.innerWidth - scroller.getBoundingClientRect().width;
            setScroll((prevScroll) => clamp(prevScroll - e.deltaY * 0.26, scrollMin, 0));
        });

    }, []);

    function addToCart(bookType: BookType) {
        shoppingCart.items.push(bookType);
        shoppingCart.totalValue += bookType.price;
    }

    return (
        <>
            <div className={styles.page}>
                <div className={styles.scroller} style={{
                    left: scroll + 'px'
                }} id='scroller'>
                    {books && <div className={styles.shelf} id="topShelf">
                        {books.slice(0, Math.floor(books.length / 2)).map((book, index) => (
                            <Book key={index} book={{...book, title: book.title.length > 10 ? book.title.substring(0, 10) + '...' : book.title}} onClick={() => setSelected(index)} />
                        ))}
                    </div>}

                    {books && <div className={styles.shelf} id="bottomShelf">
                        {books.slice(Math.floor(books.length / 2)).map((book, index) => (
                            <Book key={index} book={{...book, title: book.title.length > 10 ? book.title.substring(0, 10) + '...' : book.title}} onClick={() => setSelected(index)} />
                        ))}
                    </div>
                    }
                </div>
            </div>

            {selected !== null && <div className={styles.modal} id="bookModal" onClick={() => setSelected(null)}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <button className={styles.close} onClick={() => setSelected(null)} id="closeModal">Close</button>

                    <h2 className={styles.title}>{ books[selected].title }</h2>
                    <p className={styles.description}>{ books[selected].description }</p>

                    <div className={styles.informationTable}>
                        <b>Author:</b>
                        <p>{ books[selected].author }</p>

                        <b>Price:</b>
                        <p>{ books[selected].price }$</p>

                        <button
                            className={styles.addToCart}
                            onClick={() => addToCart(books[selected])}
                            id="addToCart"
                        >
                            Add to cart<FaShoppingCart />
                        </button>
                    </div>
                </div>
            </div>}
        </>
    );
}
