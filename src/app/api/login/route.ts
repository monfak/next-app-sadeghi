import cookie from "cookie";
import { cookies } from "next/headers";

export async function POST(request : Request) {
    const req = await request.json();
    cookies().delete("access_token");

    return new Response(JSON.stringify({ status: 'success' }) , {
        status : 200 ,
        headers : {
            "Set-Cookie" : cookie.serialize("access_token" , req?.access_token ,{
                httpOnly : true,
                maxAge : 60 * 60 * 24,
                sameSite : "lax",
                path: "/",
                // domain : '.'
                // secure : 
            })
        }
    })
}
