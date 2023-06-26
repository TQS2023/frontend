'use server';

import {
    ALL_PICKUP_POINTS_API,
    ALL_PRODUCTS_API,
    CREATE_ORDER_API,
    LOGIN_API,
    MY_PACKAGES_API,
    PRODUCT_API,
    REGISTER_API
} from "@/backend";
import {
    BookListType,
    BookType,
    PackageListingType,
    PickupPointType,
    ProfileType,
    TokenResponseType,
    UserType
} from "@/types";

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

export async function order(token: string, books: BookType[]): Promise<boolean> {
    const response = await fetch(CREATE_ORDER_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            products: books.map(book => book.productId)
        }),
        cache: "no-cache"
    });

    return response.status === 200 && (await response.json()).success;
}

async function fetchBookInfo(bookId: string): Promise<BookType> {
    const response = await fetch(PRODUCT_API + bookId);
    return (await response.json()) as BookType;
}

export async function fetchPackages(token: string): Promise<PackageListingType> {
    const response = await fetch(MY_PACKAGES_API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        cache: "no-cache"
    });

    const jsonResponse = (await response.json()) as PackageListingType;
    jsonResponse.packages = await Promise.all(jsonResponse.packages.map(async packageItem => {
        const books = [] as BookType[];
        for (const bookId of packageItem.items) {
            const book = books.find(book => book.productId === bookId);
            if (book) {
                books.push(book);
            } else {
                books.push(await fetchBookInfo(bookId));
            }
        }
        packageItem.books = books;
        return packageItem;
    }));
    return jsonResponse;
}

export async function fetchPickupPoints(): Promise<PickupPointType[]> {
    const response = await fetch(ALL_PICKUP_POINTS_API);
    return (await response.json()).pickupPoints as PickupPointType[];
}