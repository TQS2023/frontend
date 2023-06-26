'use client';

import { Montserrat } from 'next/font/google';
import '@/styles/globals.scss'
import Navbar from "@/components/navbar";
import {UserContext, UserContextData} from '@/contexts/auth';
import {ShoppingCartContext, ShoppingCartData} from '@/contexts/shopping';


const inter = Montserrat({ subsets: ['latin'] });

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>E-Library</title>
        </head>
        <body className={inter.className}>
            <UserContextData>
                <ShoppingCartData>
                    <Navbar />
                    {children}
                </ShoppingCartData>
            </UserContextData>
        </body>
        </html>
    );
}
