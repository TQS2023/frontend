'use client';

import { Montserrat } from 'next/font/google';
import '@/styles/globals.scss'
import Navbar from "@/components/navbar";
import { UserContext } from '@/contexts/auth';
import { ShoppingCartContext } from '@/contexts/shopping';


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
            <UserContext.Provider value={{token: null}}>
                <ShoppingCartContext.Provider value={{items: [], totalValue: 0}}>
                    <Navbar />
                    {children}
                </ShoppingCartContext.Provider>
            </UserContext.Provider>
        </body>
        </html>
    );
}
