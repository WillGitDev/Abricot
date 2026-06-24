import { NextResponse } from 'next/server';
import { MistralAI, MistralAIEmbedding } from '@llamaindex/mistral';
import { VectorStoreIndex, Document, Settings } from 'llamaindex';
export async function POST(request) {
    try {
        Settings.llm = new MistralAI({
            apiKey: process.env.MISTRAL_TOKEN,
            model: 'mistral-small-latest',
        });
        Settings.embedModel = new MistralAIEmbedding({
            apiKey: process.env.MISTRAL_TOKEN,
        });
        const body = await request.json();
        const { prompt, existingTasks } = body;
        if (!prompt || !existingTasks || existingTasks.length === 0) {
            return NextResponse.json(
                { message: 'Information manquante' },
                { status: 400 }
            );
        }
        const documents = existingTasks.map(
            (task) =>
                new Document({
                    text: `
            Titre: ${task.title} Description: ${task.description}`,
                })
        );
        const index = await VectorStoreIndex.fromDocuments(documents);
        const queryEngine = index.asQueryEngine();
        const structuredPrompt = `
            ### Voici le prompt de l'utilisateur : ${prompt}
            ### Je veux qu'avec le prompt de l'utilisateur et 
            les tâches similaires que tu as reçu ou pas, que tu me fais,
            une réponse structurée en JSON de ce format uniquement sans aucun
            autre caractère : 
            [
                {
                    "title": "...",
                    "description": "..."
                }
            ]
            
        `;
        const response = await queryEngine.query({ query: structuredPrompt });
        const responseText = response.toString();
        const responseJson = () => {
            const start = responseText.indexOf('[');
            const end = responseText.lastIndexOf(']') + 1;
            return responseText.slice(start, end);
        };
        const date = new Date();

        try {
            const tasks = JSON.parse(responseJson());
            const tasksComplete = tasks.map((task) => ({
                ...task,
                priority: 'MEDIUM',
                dueDate: date.toISOString().split('T')[0],
                assignees: [],
            }));

            return NextResponse.json({ tasks: tasksComplete }, { status: 200 });
        } catch {
            return NextResponse.json(
                { message: "La réponse de l'ia n'est pas un JSON valide" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error(error);

        const status = error.status || error.statusCode;

        if (status === 429) {
            return NextResponse.json(
                { message: "Quota de l'IA dépassé, réessayez dans un moment." },
                { status: 429 }
            );
        }

        if (status === 401) {
            return NextResponse.json(
                { message: 'Clé API invalide' },
                { status: 401 }
            );
        }

        if (status === 503) {
            return NextResponse.json(
                { message: "Le service d'IA est momentanément indisponible" },
                { status: 503 }
            );
        }

        return NextResponse.json(
            {
                message: 'Erreur serveur',
            },
            { status: 500 }
        );
    }
}
