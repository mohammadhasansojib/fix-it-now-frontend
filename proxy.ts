import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'


export const proxy = async (request: NextRequest) => {
    const pathname = request.nextUrl.pathname;
    const isAuthenticated = !!request.cookies.get("access_token");

    // auth route protection
    if (pathname.startsWith("/auth")) {

        if (isAuthenticated) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    // dashboard route protection
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/payment")) {

        if (!isAuthenticated) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }

    return NextResponse.next();
}

 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
}

export default proxy;