import { NextResponse } from 'next/server'
import  { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    const path =request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup';

    const encodedToken = request.cookies.get('token')?.value || '';


    if(isPublicPath && encodedToken){
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    if(!isPublicPath && !encodedToken){
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/','/profile','/profile/:path*','/login', '/signup',],
}