import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const cookieHeader = request.headers.get('cookie');
    let token = null;
    if (cookieHeader) {
      const cookies = cookieHeader.split(';');
      const tokenCookie = cookies.find((c) => c.trim().startsWith('token='));
      if (tokenCookie) {
        token = tokenCookie.split('=')[1];
      }
    }
    if (!token) {
      return NextResponse.json(
        { message: 'Pas de token trouvé' },
        { status: 401 }
      );
    }
    const response = await fetch('http://localhost:8000/auth/profile', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Erreur profile:', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}
