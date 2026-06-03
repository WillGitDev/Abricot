import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ message: 'Déconnecté' });
  res.cookies.set('token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return res;
}
