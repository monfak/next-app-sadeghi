'use client';

import { useRouter } from "next/navigation"
import {ReactNode, Fragment, useState, useEffect} from "react"
import Header from './header'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    Bars3BottomLeftIcon,
    BellIcon,
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

import SidebarLayout from "@/components/admin/layouts/sidebarLayout"
import {store} from "@/store";
import {selectUser, selectIsRedirect,selectUserLoading} from "@/store/auth";
import CanAccess from "@/components/shared/canAccess";
import useAuth from "@/hooks/useAuth";
import LoadingBox from '@/components/shared/loadingBox';
import {useAppSelector} from "@/hooks";







interface Props {
    children: ReactNode
}

const AdminPanelLayout = ({ children }: Props) => {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { error } = useAuth();
    const loading = useAppSelector(selectUserLoading);
    const user = useAppSelector(selectUser);
    const isRedirect = useAppSelector(selectIsRedirect);
    if (isRedirect)
    {
        router.push('/auth/login')
    }
    return (
        <>
            {
                loading ?
                    <div className='p-5' data-loading={loading+''}>
                        <LoadingBox/>
                    </div> : ''
            }
            <CanAccess permissions='admin'>
                <div>
                    <SidebarLayout open={sidebarOpen} setOpen={setSidebarOpen}/>

                    <div className="flex flex-col md:pr-64">
                        <Header open={sidebarOpen} setOpen={setSidebarOpen}/>
                        <main className="flex-1">
                            <div className="py-6">
                                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                                    {/* Replace with your content */}
                                    {children}
                                    {/* /End replace */}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </CanAccess>
        </>
    )
}


export default AdminPanelLayout;