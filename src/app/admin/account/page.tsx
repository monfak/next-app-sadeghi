'use client';
import AccountForm from "@/components/forms/account/accountForm"
import {useAppDispatch, useAppSelector} from "@/hooks";
import {selectUser} from "@/store/auth";
import {useRouter} from "next/navigation";
const AdminPanel = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const router = useRouter();
    return (
        <>
            <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                 <AccountForm router={router} user={user.user}/>
            </div>
        </>
    )
}

export default AdminPanel;