import useSWR from "swr";
import { useAppDispatch,useAppSelector } from ".";
import {updateIsRedirect, selectUser, updateUser,updateLoading} from "@/store/auth";
import { fetcher } from "@/helpers/api";

const useAuth = () => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectUser=>selectUser?.auth?.user);
    const name = currentUser?.name ;
    const is_exist_user = name && name != 'undefined' ? true : false ;
    const { data : user , error } = useSWR(!is_exist_user ? ['get_me', currentUser] : null ,  async () => {
        let res = await fetcher({
            url : "get_me",
            options : {
                method:"GET",
                credentials : "include",
            }
        });

        if(res.status === 200) {
            let data = await res.json();
            if (data.success)
            {
                dispatch(updateUser(data?.data?.user))
                dispatch(updateLoading(false))

                return data?.data?.user;


            } else {
                dispatch(updateIsRedirect(true))
                throw new Error('unAuthorized!')
            }

        }

        throw new Error('unAuthorized!')
    })

    if (user && !error)
    {
        // dispatch(updateUser(user))
    }

    return { user : user , error , loading : !user && !error }
}



export default useAuth;