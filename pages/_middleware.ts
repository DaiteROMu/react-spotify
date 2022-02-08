import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const authReq = req as NextRequest & NextApiRequest;

    // Token will exist if user is logged in
    const token = await getToken({
        req: authReq,
        secret: process.env.JWT_SECRET,
    });

    const { pathname } = req.nextUrl;

    // Allow the requests if the following is true...
    // 1) request for next-auth session and provider fetching
    // 2) the token exists
    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    // Redirect to login if user don't have token and is requesting a protected route
    if (!token && pathname !== '/login') {
        return NextResponse.redirect('/login');
    }
}
