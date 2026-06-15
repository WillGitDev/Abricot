import {NextResponse } from 'next/server';
import {getToken} from '@/utils/getToken';

export async function GET(request){
    const cookieHeader = request.headers.get('cookie');
    const token = getToken(cookieHeader);

    if(!token){
        return NextResponse.json(
            {message: 'Pas de token trouvé'},
            {status: 401}
        );
    }
    const {searchParams} = new URL(request.url);
    const query = searchParams.get('query');

    const response = await fetch(
        `http://localhost:8000/users/search?query=${query}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    );
    const data = await response.json();
    return NextResponse.json(data);
}