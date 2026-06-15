import { NextResponse } from 'next/server';
import { getToken } from '@/utils/getToken';

export async function POST(request) {
    try {
        const cookieHeader = request.headers.get('cookie');
        const token = getToken(cookieHeader);

        if (!token) {
            console.error("Pas de token d'authentification");
            return NextResponse.json(
                { message: 'Pas de token trouvé' },
                { status: 401 }
            );
        }
        const body = await request.json();

        const response = await fetch(
            'http://localhost:8000/projects',
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: body.name,
                    description: body.description,
                    contributors: body.contributors,
                }),
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
        console.error("Erreur lors de l'enregistrement du projet : ", error);
        return NextResponse.json(
            { message: 'Erreur serveur' },
            { status: 500 }
        );
    }
}
