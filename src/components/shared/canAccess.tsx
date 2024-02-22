import Link from "next/link"
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";
import User from "../../models/user";


interface Props {
    children : React.ReactNode
    permissions? : string
}

export default function CanAccess({ children , permissions } : Props) {
    const router = useRouter();
    const { user : userData } = useAuth();

    const user = new User(userData);
    
    if(permissions) {
        if(! user.canAccess(permissions) ) {
            router.push('/admin');
            return <span>loading ...</span>
        }
    }

    return <>{children}</>
}