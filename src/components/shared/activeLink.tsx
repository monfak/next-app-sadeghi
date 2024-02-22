import Link from "next/link"
import { useRouter, usePathname } from "next/navigation";



// <Link>
//     <a></a>
// </Link>


// <ActiveLink>
//     {
//         ({ active }) => (
//             <>
//         )
//     }
// </ActiveLink>

interface Props {
    children : React.ReactElement | ( ({ active } : { active : boolean}) => React.ReactElement  ),
    href : string,
    as? : string
}

export default function ActiveLink({ children , ...props } : Props) {
    const path = usePathname();

    const active = path === props.href || path === props.as;

    return (
        <Link {...props}>
            {
                typeof children === 'function' 
                ? children({ active })
                : children
            }
        </Link>
    )
}