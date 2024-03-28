'use client';
import { useAppDispatch } from '@/hooks'
import { updateCurrentToken,updateUser } from '@/store/auth'
import LoginForm from '@/components/forms/auth/LoginForm'
import { useRouter } from 'next/navigation';
import User, { UserType } from '../../../models/user';
import {storeLoginToken} from "@/helpers/auth";

const Login = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const setUserVerifycation = (token: string,user:UserType) => {
        dispatch(updateCurrentToken(token));
        storeLoginToken(token)
        dispatch(updateUser(user))
    }

    return (
        <>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Login on Shopy</h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <LoginForm setUserVerifycation={setUserVerifycation} router={router} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
