import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const response = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message }, { status: 401 });
    }
    const res = NextResponse.json({ user: data.data.user });
    res.cookies.set('token', data.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return res;
  } catch (error) {
    console.error('Erreur login: ', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}
