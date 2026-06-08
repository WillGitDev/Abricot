import { NextResponse } from 'next/server';
import { getToken } from '@/utils/getToken';

export async function GET(request) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const token = getToken(cookieHeader);
    console.log('Le token : ', token);
    if (!token) {
      console.error("Pas de token d'authentification");
      return NextResponse.json(
        { message: 'Pas de token trouvé' },
        { status: 401 }
      );
    }
    const response = await fetch(
      'http://localhost:8000/dashboard/projects-with-tasks',
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message },
        { status: response.status }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erreur de récupération des projets : ', error);
    return NextResponse.json(
      {
        message: 'Erreur serveur',
      },
      { status: 500 }
    );
  }
}
