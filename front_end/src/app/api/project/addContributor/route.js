import { NextResponse } from 'next/server';
import { getToken } from '@/utils/getToken';

export async function POST(request) {
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
        const { projectId, email } = body;

        if (!projectId || !email) {
            return NextResponse.json(
                { message: 'ID du projet ou email manquant' },
                { status: 400 }
            );
        }

        const response = await fetch(
            `http://localhost:8000/projects/${projectId}/contributors`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
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
        console.error('Erreur addContributor:', error);
        return NextResponse.json(
            { message: 'Erreur serveur' },
            { status: 500 }
        );
    }
}