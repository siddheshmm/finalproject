import { NextRequest, NextResponse } from 'next/server'

import { getToken } from "next-auth/jwt"

//The most simple usage is when you want to require authentication for your entire site.
export { default } from "next-auth/middleware"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const url = request.nextUrl

    if (token &&
        (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up') || url.pathname.startsWith('/verify') || url.pathname === '/')
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    //testing error --siddhesh
    //return NextResponse.redirect(new URL('/sign-in', request.url))
}

// See "Matching Paths" below to learn more
//Files and paths where you want middleware to run is stored in here, i.e., config
export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/',
        '/dashboard/:path*',
        '/verify/:path*'
    ],
}