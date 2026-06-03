import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('------------MIDDLEWARE------------');
  console.log('URL demandée :', request.nextUrl.pathname);
  console.log('Token détecté par le serveur :', request.cookies.get('token'));
  const token = request.cookies.get('token')?.value;

  // Redirection sur la page /login si il n'y a pas de token
  if (!token) {
    console.log("Middleware: Le token n'existe pas.");
    const loginUrl = new URL('/', request.url);
    return NextResponse.redirect(loginUrl);
  }
  console.log('Middleware: Token OK, accès autorisé.');
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
