'use client';

import Header from '@/components/layouts/header'
import './globals.css'

// import { Vazirmatn } from 'next/font/google'
import localFont from 'next/font/local'
import {Provider} from 'react-redux'
import {store} from '@/store'
import {useEffect} from 'react';
import {updateLoading, updateUser} from '@/store/auth';
import { ToastContainer } from 'react-toastify';

// const vazirmatn = Vazirmatn({ subsets: ['latin'] })
const vazir = localFont({
    src: [
        {
            path: './../../public/webfonts/Vazirmatn-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: './../../public/webfonts/Vazirmatn-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
})

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    return (
        <html lang="en" dir="rtl">
        <Provider store={store}>
            <body className={`${vazir.className} bg-gray-100`}>
            {children}
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
            />
            </body>
        </Provider>
        </html>
    )
}
