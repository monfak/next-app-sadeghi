'use client';
import AccountForm from "@/components/forms/account/accountForm"
import {useAppDispatch, useAppSelector} from "@/hooks";
import {selectUser, updateCurrentToken, updateIsRedirect, updateLoading, updateUser} from "@/store/auth";
import {useRouter} from "next/navigation";
import User, {UserType} from "@/models/user";
import {storeLoginToken} from "@/helpers/auth";
const AdminPanel = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const setUserVerifycation = (token: string,user:UserType) => {
        dispatch(updateCurrentToken(token));
        storeLoginToken(token)
        dispatch(updateUser(user))
        dispatch(updateLoading(false))
        dispatch(updateIsRedirect(false))
    }
    return (
        <>
            <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                 <AccountForm router={router} user={user?.user} setUserVerifycation={setUserVerifycation}/>
            </div>
        </>
    )
}

export default AdminPanel;