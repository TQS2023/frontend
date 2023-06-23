'use server';

import {ALL_PRODUCTS_API, LOGIN_API, REGISTER_API} from "@/backend";
import {BookListType, BookType, ProfileType, TokenResponseType, UserType} from "@/types";

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

export async function login(email: string, password: string): Promise<TokenResponseType | null> {
    const response = await fetch(LOGIN_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        }),
        cache: "no-cache"
    });

    if (response.status !== 200) {
        return null;
    }

    const jsonResponse = await response.json();
    return jsonResponse as TokenResponseType;
}

export async function register(user: UserType): Promise<TokenResponseType | null> {
    const response = await fetch(REGISTER_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        cache: "no-cache"
    });
    if (response.status !== 200) {
        return null;
    }

    const jsonResponse = await response.json();
    return jsonResponse as TokenResponseType;
}

export async function profile(token: string): Promise<ProfileType | null> {
    const response = await fetch(LOGIN_API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        cache: "no-cache"
    });
    if (response.status !== 200) {
        return null;
    }

    const jsonResponse = await response.json();
    return jsonResponse as ProfileType;
}