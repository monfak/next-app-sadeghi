import ValidationError from "@/exceptions/validationError";
import {fetcher} from '@/helpers/api';
import {UserType} from "@/models/user";
import {updateCurrentToken, updateIsRedirect, updateLoading, updateUser} from "@/store/auth";
import {storeLoginToken} from "@/helpers/auth";
import {useAppDispatch} from "@/hooks";

export async function UpdateUser(userId  : number ,  values : any) {
    const formdata = new FormData();
    for ( var key in values ) {
        formdata.append(key, values[key]);
    }
    try {
        return await fetcher({
            url: `admin/users/${userId}`,
            options: {
                method: 'POST',
                credentials: "include",
                redirect: 'follow',
                body: formdata
            }
        }) ;
    } catch (error) {
        if(error instanceof ValidationError) {
            throw new ValidationError(error)
        }
    }
}

export function updateUserInfo(user:UserType,token:string){
    console.log(77777,user,token)
    const dispatch = useAppDispatch();
    if (token)
    {
        dispatch(updateCurrentToken(token));
        storeLoginToken(token)
    }
    console.log(8888888,user,token)

    dispatch(updateUser(user))
    dispatch(updateLoading(false))
    dispatch(updateIsRedirect(false))
}