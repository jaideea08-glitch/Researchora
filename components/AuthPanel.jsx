'use client';
import { useEffect, useState } from 'react';
import { ArrowRight, LogIn, LogOut, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
export function AuthPanel() {
    const router = useRouter();
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState('sign-in');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    useEffect(() => {
        var _a;
        const fetchSession = async () => {
            if (!supabase) {
                return;
            }
            const { data: { session }, } = await supabase.auth.getSession();
            setSession(session);
        };
        fetchSession();
        const { data } = (_a = supabase === null || supabase === void 0 ? void 0 : supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })) !== null && _a !== void 0 ? _a : { data: null };
        return () => {
            data === null || data === void 0 ? void 0 : data.subscription.unsubscribe();
        };
    }, []);
    const createProfile = async (user) => {
        var _a, _b;
        if (!supabase || !(user === null || user === void 0 ? void 0 : user.id)) {
            return;
        }
        await supabase.from('profiles').upsert({
            id: user.id,
            email: user.email,
            full_name: fullName || ((_a = user.user_metadata) === null || _a === void 0 ? void 0 : _a.full_name) || user.email,
            role: ((_b = user.user_metadata) === null || _b === void 0 ? void 0 : _b.role) || null,
        });
    };
    const handleSignIn = async () => {
        if (!supabase) {
            setError('Supabase client is not configured.');
            return;
        }
        setLoading(true);
        setError('');
        setMessage('');
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        setLoading(false);
        if (error) {
            setError(error.message);
            return;
        }
        if (data.user) {
            await createProfile(data.user);
            setMessage('Signed in successfully.');
            router.push('/home');
        }
    };
    const handleSignUp = async () => {
        if (!supabase) {
            setError('Supabase client is not configured.');
            return;
        }
        setLoading(true);
        setError('');
        setMessage('');
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: fullName },
            },
        });
        setLoading(false);
        if (error) {
            setError(error.message);
            return;
        }
        if (data.user) {
            await createProfile(data.user);
            setMessage('Account created. Check your email to verify and sign in.');
            router.push('/home');
        }
        else {
            setMessage('Account created. Check your email to verify your address.');
        }
    };
    const handleSignOut = async () => {
        if (!supabase) {
            return;
        }
        await supabase.auth.signOut();
        setSession(null);
        setMessage('Signed out successfully.');
    };
    if (!supabase) {
        return (<div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-slate-300">
        <p className="font-semibold text-white">Supabase is not configured.</p>
        <p>Check your environment variables and restart the app.</p>
      </div>);
    }
    if (session === null || session === void 0 ? void 0 : session.user) {
        return (<div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Signed in as</p>
            <p className="mt-1 text-lg font-semibold text-white">{session.user.email}</p>
          </div>
          <button type="button" onClick={handleSignOut} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-400">
            <LogOut className="h-4 w-4"/>
            Sign out
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-400">
          After signing out, return here to log in again and publish posts with your account.
        </p>
      </div>);
    }
    return (<div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        {mode === 'sign-in' ? <LogIn className="h-4 w-4 text-brand-300"/> : <UserPlus className="h-4 w-4 text-brand-300"/>}
        <span>{mode === 'sign-in' ? 'Access your account' : 'Create a new account'}</span>
      </div>

      <div className="mt-6 space-y-4">
        <div className="grid gap-4">
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" placeholder="Email address"/>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" placeholder="Password"/>
          {mode === 'sign-up' ? (<input type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" placeholder="Full name"/>) : null}
        </div>

        {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        {message ? <p className="text-sm text-slate-400">{message}</p> : null}

        <button type="button" onClick={mode === 'sign-in' ? handleSignIn : handleSignUp} disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60">
          {mode === 'sign-in' ? <LogIn className="h-4 w-4"/> : <UserPlus className="h-4 w-4"/>}
          {loading ? 'Working…' : mode === 'sign-in' ? 'Sign in' : 'Create account'}
        </button>

        <button type="button" onClick={() => setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')} className="inline-flex items-center justify-center gap-2 text-sm text-slate-400 underline-offset-4 hover:text-white">
          <ArrowRight className="h-4 w-4"/>
          {mode === 'sign-in' ? 'New here? Create an account' : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>);
}
