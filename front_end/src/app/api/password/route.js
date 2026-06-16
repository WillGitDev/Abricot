import { NextResponse } from 'next/server';
import { getToken } from '@/utils/getToken';

// Route pour la modification du mot de passe
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
        const { currentPassword, newPassword } = body;

        const response = await fetch('http://localhost:8000/auth/password', {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currentPassword, newPassword }),
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
        console.error('Erreur updatePassword:', error);
        return NextResponse.json(
            { message: 'Erreur serveur' },
            { status: 500 }
        );
    }
}
