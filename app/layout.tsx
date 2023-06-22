import { Montserrat } from 'next/font/google';
import '@/styles/globals.scss'
import Navbar from "@/components/navbar";


const inter = Montserrat({ subsets: ['latin'] });

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
            <Navbar />
            {children}
        </body>
        </html>
    );
}
