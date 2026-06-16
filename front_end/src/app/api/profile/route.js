import { NextResponse } from 'next/server';
import { getToken } from '@/utils/getToken';

export async function GET(request) {
    try {
        const cookieHeader = request.headers.get('cookie');
        const token = getToken(cookieHeader);

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
        return NextResponse.json(
            { message: 'Erreur serveur' },
            { status: 500 }
        );
    }
}

// La route pour la modification du nom et email

export async function PUT(request) {
    try {
        const cookieHeader = request.headers.get('cookie');
        const token = getToken(cookieHeader);

        if (!token) {
            return NextResponse.json(
                { message: 'Pas de token trouvé' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { name, email } = body;

        const response = await fetch('http://localhost:8000/auth/profile', {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
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
        console.error('Erreur updateProfile:', error);
        return NextResponse.json(
            { message: 'Erreur serveur' },
            { status: 500 }
        );
    }
}
