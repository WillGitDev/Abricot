import { NextResponse } from 'next/server';
import { MistralAI, MistralAIEmbedding } from '@llamaindex/mistral';
import { VectorStoreIndex, Document, Settings } from 'llamaindex';
export async function POST(request) {
    try {
        Settings.llm = new MistralAI({
            apiKey: process.env.MISTRAL_API_KEY,
            model: 'mistral-small-latest',
        });
        Settings.embedModel = new MistralAIEmbedding({
            apiKey: process.env.MISTRAL_API_KEY,
        });
        const body = await request.json();
        const { prompt, existingTasks } = body;
        if (!prompt || !existingTasks) {
            return NextResponse.json(
                { message: 'Information manquante' },
                { status: 400 }
            );
        }
        const structuredPrompt = `
        ### Tu es un expert en organisation pour découper un projet en tâches.
        ### Objectif: À partir de la demande de l'utilisateur et des tâches, propose au minimum 3 tâches en lien avec les autres tâches sauf si la demande de l'utilisateur spécifie un nombre de tâches.
        ### Voici le prompt de l'utilisateur : ${prompt}
        ###Contraintes :
        _ Réponds en français.
        _ Le title et la description sont obligatoires, avec une limite minimale de deux caractères.
        _ Utilise les tâches existantes comme référence pour le style, le vocabulaire.
        _ Ne duplique pas les tâches existantes.
        _ Réponds UNIQUEMENT avec ce format JSON, sans aucun autre caractère.
        [
            {
                "title": "...",
                "description": "..."
                }
                ]
                `;
        const documents = existingTasks.map(
            (task) =>
                new Document({
                    text: `
                    Titre: ${task.title} Description: ${task.description}`,
                })
        );

        let responseText;
        if (existingTasks.lenght > 0) {
            const index = await VectorStoreIndex.fromDocuments(documents);
            const queryEngine = index.asQueryEngine();
            const response = await queryEngine.query({
                query: structuredPrompt,
            });
            responseText = response.toString();
        } else {
            const response = await Settings.llm.complete({
                prompt: structuredPrompt,
            });
            responseText = response.text;
        }

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
