import Link from "next/link"
import { useRouter } from "next/navigation";
import User from "../../models/user";
import {useAppSelector} from "@/hooks";
import {selectUser} from "@/store/auth";


interface Props {
    children : React.ReactNode
    permissions? : string
}

export default function CanAccess({ children , permissions } : Props) {
    const router = useRouter();
    const user = useAppSelector(selectUser);

    if(permissions) {
        if(! user.canAccess(permissions) ) {
            // router.push('/auth/login');
            return <>
                You are not permitted
            </>
        }
    }

    return <>{children}</>
}