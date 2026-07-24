'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BookOpenText, PlusCircle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
export function PostComposer() {
    const router = useRouter();
    const [author, setAuthor] = useState('');
    const [role, setRole] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(true);
    useEffect(() => {
        const loadProfile = async () => {
            if (!supabase) {
                setLoadingProfile(false);
                return;
            }
            const { data: { session }, } = await supabase.auth.getSession();
            if (!(session === null || session === void 0 ? void 0 : session.user)) {
                setIsSignedIn(false);
                setLoadingProfile(false);
                return;
            }
            setIsSignedIn(true);
            const userId = session.user.id;
            const { data: profile } = await supabase.from('profiles').select('full_name, role').eq('id', userId).single();
            if (profile === null || profile === void 0 ? void 0 : profile.full_name) {
                setAuthor(profile.full_name);
            }
            else if (session.user.email) {
                setAuthor(session.user.email);
            }
            if (profile === null || profile === void 0 ? void 0 : profile.role) {
                setRole(profile.role);
            }
            setLoadingProfile(false);
        };
        loadProfile();
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        if (!author || !role || !title || !body) {
            setError('Please complete all fields.');
            return;
        }
        if (!isSignedIn) {
            setError('Please sign in before publishing a post.');
            return;
        }
        setSubmitting(true);
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                author,
                role,
                title,
                body,
                stats: '0 comments • 0 saves',
            }),
        });
        setSubmitting(false);
        if (!response.ok) {
            const payload = await response.json();
            setError(payload.error || 'Failed to publish post.');
            return;
        }
        setAuthor('');
        setRole('');
        setTitle('');
        setBody('');
        router.refresh();
    };
    return (<div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <BookOpenText className="h-4 w-4 text-brand-300"/>
        Share a new study update
      </div>
      {loadingProfile ? (<p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">Loading your profile…</p>) : !isSignedIn ? (<p className="rounded-2xl border border-rose-500/20 bg-rose-500/5 px-4 py-3 text-sm text-rose-200">
          Sign in above to publish and save posts with your account.
        </p>) : null}
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input value={author} onChange={(event) => setAuthor(event.target.value)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" placeholder="Your name" disabled={!isSignedIn}/>
          <input value={role} onChange={(event) => setRole(event.target.value)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" placeholder="Research area" disabled={!isSignedIn}/>
        </div>
        <input value={title} onChange={(event) => setTitle(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" placeholder="Post title"/>
        <textarea value={body} onChange={(event) => setBody(event.target.value)} className="min-h-32 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" placeholder="What did you discover today?"/>
        {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        <button type="submit" disabled={submitting || !isSignedIn} className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60">
          <PlusCircle className="h-4 w-4"/>
          {submitting ? 'Publishing…' : 'Publish post'}
        </button>
      </form>
    </div>);
}
