import { NextResponse } from 'next/server';
import { getToken } from '@/utils/getToken';

export async function DELETE(request) {
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
        const { projectId, userId } = body;

        if (!projectId || !userId) {
            return NextResponse.json(
                { message: 'ID du projet ou de l’utilisateur manquant' },
                { status: 400 }
            );
        }

        const response = await fetch(
            `http://localhost:8000/projects/${projectId}/contributors/${userId}`,
            {
                method: 'DELETE',
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
        console.error('Erreur removeContributor:', error);
        return NextResponse.json(
            { message: 'Erreur serveur' },
            { status: 500 }
        );
    }
}