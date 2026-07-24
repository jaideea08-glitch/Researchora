import { NextResponse } from 'next/server';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
export async function POST(request) {
    var _a, _b, _c, _d, _e;
    if (!GEMINI_API_KEY) {
        return NextResponse.json({ error: 'Gemini API key is not configured.' }, { status: 500 });
    }
    try {
        const body = await request.json();
        const { message, history = [], context } = body;
        const systemPrompt = [
            'You are Researchora AI, a research assistant specialized in helping users understand scientific papers.',
            'Explain research papers, methodology, figures, tables, equations, and technical terminology clearly.',
            'Summarize sections, compare papers, recommend relevant literature, and help interpret statistical analyses.',
            'If a user asks an unrelated question, politely redirect them back to research topics.',
            'Do not fabricate citations, papers, authors, journals, or findings.',
            'When context is available, incorporate the paper title, authors, abstract, and user highlights or notes into the answer.',
        ].join(' ');
        const payload = {
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: `${systemPrompt}\n\nContext:\n${context || 'No specific paper context provided.'}` },
                        ...history.map((item) => ({
                            role: item.role === 'assistant' ? 'model' : 'user',
                            parts: [{ text: item.content }],
                        })),
                        { role: 'user', parts: [{ text: message }] },
                    ],
                },
            ],
            generationConfig: {
                temperature: 0.4,
                topP: 0.9,
                maxOutputTokens: 700,
            },
        };
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json({ error: errorText }, { status: response.status });
        }
        const data = await response.json();
        const aiText = ((_e = (_d = (_c = (_b = (_a = data === null || data === void 0 ? void 0 : data.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text) || 'I can help with that. Please ask about a paper or a research topic.';
        return NextResponse.json({ reply: aiText });
    }
    catch (error) {
        console.error('Gemini route error:', error);
        return NextResponse.json({ error: 'Unable to process the request.' }, { status: 500 });
    }
}
