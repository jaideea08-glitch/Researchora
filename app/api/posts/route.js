import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
const missingClient = !supabase;
export async function GET() {
    if (missingClient) {
        return NextResponse.json({
            error: 'Supabase client is not configured. Set SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL and SUPABASE_ANON_KEY / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local.',
        }, { status: 500 });
    }
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}
export async function POST(request) {
    if (missingClient) {
        return NextResponse.json({
            error: 'Supabase client is not configured. Set SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL and SUPABASE_ANON_KEY / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local.',
        }, { status: 500 });
    }
    const body = await request.json();
    const { author, role, title, body: text, stats } = body;
    if (!author || !role || !title || !text || !stats) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const { data, error } = await supabase.from('posts').insert([
        { author, role, title, body: text, stats },
    ]);
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
}
