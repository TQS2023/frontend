'use client';

import styles from '@/styles/home.module.scss';
import {useEffect, useState} from "react";
import Book from "@/components/Book";
import {BookType} from "@/types";
import Link from "next/link";
import {fetchAllProducts} from "@/actions/actions";


export default function Home() {
    const [scroll, setScroll] = useState(0);
    const [books, setBooks] = useState<BookType[]>([]);
    const [selected, setSelected] = useState<number | null>(null);

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

    return (
        <>
            <div className={styles.page}>
                <div className={styles.topBar}>
                    <div className={styles.right}>
                        <h1>E-Library</h1>
                    </div>
                    <div className={styles.left}>
                        <Link href='/login'>Login</Link>
                        <Link href='/cart'>Cart</Link>
                    </div>
                </div>

                <div className={styles.scroller} style={{
                    left: scroll + 'px'
                }} id='scroller'>
                    {books && <div className={styles.shelf}>
                        {books.slice(0, Math.floor(books.length / 2)).map((book, index) => (
                            <Book key={index} book={{...book, title: book.title.length > 10 ? book.title.substring(0, 10) + '...' : book.title}} onClick={() => setSelected(index)} />
                        ))}
                    </div>}

                    {books && <div className={styles.shelf}>
                        {books.slice(Math.floor(books.length / 2)).map((book, index) => (
                            <Book key={index} book={{...book, title: book.title.length > 10 ? book.title.substring(0, 10) + '...' : book.title}} onClick={() => setSelected(index)} />
                        ))}
                    </div>
                    }
                </div>
            </div>

            {selected !== null && <div className={styles.modal} onClick={() => setSelected(null)}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <h2 className={styles.title}>{ books[selected].title }</h2>
                    <p className={styles.description}>{ books[selected].description }</p>
                    <p>Author: { books[selected].author }</p>
                    <p>Price: { books[selected].price }$</p>
                    <button className={styles.close} onClick={() => setSelected(null)}>Close</button>
                </div>
            </div>}
        </>
    );
}
