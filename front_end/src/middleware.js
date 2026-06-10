import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  // Redirection sur la page /login si il n'y a pas de token
  if (!token) {
    const loginUrl = new URL('/', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/projects',
    '/projects/:path*',
    '/single_project',
    '/single_project/:path*',
  ],
};
