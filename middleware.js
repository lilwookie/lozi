import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const publicPaths = ['/tenant/login', '/admin/login', '/'];

  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  if (!token) {
    let loginPath = '/';

    if (pathname.startsWith('/tenant/dashboard')) {
      loginPath = '/tenant/login';
    } else if (pathname.startsWith('/admin/dashboard')) {
      loginPath = '/admin/login';
    }

    const redirectUrl = new URL(loginPath, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

// ✅ Add the matcher right here
export const config = {
  matcher: ['/tenant/dashboard/:path*', '/admin/dashboard/:path*'],
};
