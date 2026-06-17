import { NextResponse } from 'next/server';
import { MistralAI } from '@llamaindex/mistral';
import { VectorStoreIndex, Document, Settings } from 'llamaindex';

export async function POST(request) {
    Settings.llm = new MistralAI({
        apiKey: process.env.HF_TOKEN,
        model: 'mistral-small-latest',
    });
    try {
        const body = await request.json();
        const { prompt, existingTasks } = body;
        if (!prompt || !existingTasks) {
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
        const response = await queryEngine.query({ query: prompt });
        return NextResponse.json(
            { message: response.toString() },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: 'Erreur serveur',
            },
            { status: 500 }
        );
    }
}
