import useSWR from "swr";
import { useAppDispatch } from ".";
import { updateUser } from "../store/auth";
import { fetcher } from "../helpers/api";

const useAuth = () => {
    const { data : user , error } = useSWR('user_me' , async () => {
        let res = await fetcher({
            url : "user",
            options : {

            }
        });

        if(res.ok) {
            let data = await res.json();

            return data?.user;
        }

        throw new Error('unAuthorized!')
    })

    return { user : user , error , loading : !user && !error }
}



export default useAuth;