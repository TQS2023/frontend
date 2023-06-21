'use client';

import styles from '@/styles/home.module.scss';
import {useEffect, useState} from "react";
import Book from "@/components/Book";
import {BookType} from "@/types";
import Link from "next/link";


export default function Home() {
    const [scroll, setScroll] = useState(0);
    const [books, setBooks] = useState<BookType[]>([]);
    const [selected, setSelected] = useState<number | null>(null);

    const colors = [
        '#FCC565',
        '#E3594D',
        '#6DC9A4',
        '#37496D',
        '#D7604A',
        '#F6F7F1'
    ];

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

    useEffect(() => {
        const newBooks: BookType[] = [];
        let previousColor: string = '';
        for (let i = 0; i < 100; i++) {
            const possibleColors = colors.filter((color) => color !== previousColor);
            const color = possibleColors[Math.floor(Math.random() * possibleColors.length)];

            newBooks.push({
                height: Math.random() * 15 + 80,
                title: 'Book ' + i,
                color: color
            });
            previousColor = color;
        }
        setBooks(newBooks)

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
                            <Book key={index} book={book} onClick={() => setSelected(index)} />
                        ))}
                    </div>}

                    {books && <div className={styles.shelf}>
                        {books.slice(Math.floor(books.length / 2)).map((book, index) => (
                            <Book key={index} book={book} onClick={() => setSelected(index)} />
                        ))}
                    </div>
                    }
                </div>
            </div>

            {selected !== null && <div className={styles.modal} onClick={() => setSelected(null)}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <h1>{books[selected].title}</h1>
                </div>
            </div>}
        </>
    );
}
