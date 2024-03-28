'use client';

import { useRouter } from "next/navigation"
import { ReactNode } from "react"


interface Props {
    children : ReactNode
}

const GuestLayout = ({ children } : Props) => {
    const router = useRouter();

    return (
        <div className="w-full text-2xl">
            {children}
        </div>
    )
}


export default GuestLayout;