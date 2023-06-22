'use server';

import { ALL_PRODUCTS_API } from "@/backend";
import {BookListType, BookType} from "@/types";

const colors = [
    '#FCC565',
    '#E3594D',
    '#6DC9A4',
    '#37496D',
    '#D7604A',
    '#F6F7F1'
];

export async function fetchAllProducts(): Promise<BookType[]> {
    const response = await fetch(ALL_PRODUCTS_API);
    const data = (await response.json()) as BookListType;
    const books = data.products;

    let previousColor: string = '';
    for (const book of books) {
        const possibleColors = colors.filter((color) => color !== previousColor);
        const color = possibleColors[Math.floor(Math.random() * possibleColors.length)];

        book.color = color;
        book.height = Math.random() * 15 + 80;

        previousColor = color;
    }

    return books;
}