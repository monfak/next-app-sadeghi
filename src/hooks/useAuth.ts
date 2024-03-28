import useSWR from "swr";
import { useAppDispatch,useAppSelector } from ".";
import { selectAccessToken,updateUser } from "@/store/auth";
import { fetcher } from "@/helpers/api";
import Cookies from "universal-cookie";

const useAuth = () => {
    const dispatch = useAppDispatch();
    const cookie = new Cookies();
    const token = useAppSelector(selectAccessToken);

    const { data : user , error } = useSWR('user_me' , async () => {
        const headers = {
            'Authorization': 'Bearer ' + token,
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*"
        }

        let res = await fetcher({
            url : "get_me",
            options : {
                method:"POST",
                headers:headers

            }
        });

        if(res.status === 200) {
            let data = await res.json();
            if (data.success)
            {
                // dispatch(updateUser(data.user))
                return data?.data?.user;


            } else {
                throw new Error('unAuthorized!')
            }

        }

        throw new Error('unAuthorized!')
    })
    dispatch(updateUser(user))

    return { user : user , error , loading : !user && !error }
}



export default useAuth;