'use client';
import { Bot, BrainCircuit, Send, Sparkles } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
function createMessage(role, content) {
    return { id: `${role}-${Math.random().toString(36).slice(2)}`, role, content };
}
function AIAssistantContent() {
    const searchParams = useSearchParams();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [contextSummary, setContextSummary] = useState('');
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        if (!supabase) {
            return;
        }
        const loadSession = async () => {
            var _a, _b;
            const { data: { session }, } = await supabase.auth.getSession();
            setUserId((_b = (_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null);
        };
        loadSession();
        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
            var _a, _b;
            setUserId((_b = (_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null);
        });
        return () => {
            data === null || data === void 0 ? void 0 : data.subscription.unsubscribe();
        };
    }, []);
    useEffect(() => {
        const paper = searchParams.get('paper');
        const context = searchParams.get('context');
        const summary = paper ? `Paper context: ${paper}${context ? `\n${context}` : ''}` : '';
        setContextSummary(summary);
        if (messages.length) {
            return;
        }
        const storedKey = `researchora-ai-history:${userId !== null && userId !== void 0 ? userId : 'guest'}`;
        const stored = window.localStorage.getItem(storedKey);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed.length) {
                    setMessages(parsed);
                    return;
                }
            }
            catch (_a) {
                window.localStorage.removeItem(storedKey);
            }
        }
        setMessages([
            createMessage('assistant', "I'm Researchora's AI assistant. I specialize in helping users understand and analyze research papers. Please ask me a question related to research, a paper you're reading, or a scientific topic."),
        ]);
    }, [messages.length, searchParams, userId]);
    useEffect(() => {
        if (!messages.length) {
            return;
        }
        const storedKey = `researchora-ai-history:${userId !== null && userId !== void 0 ? userId : 'guest'}`;
        window.localStorage.setItem(storedKey, JSON.stringify(messages));
        if (!supabase || !userId) {
            return;
        }
        void supabase.from('ai_conversations').upsert({
            user_id: userId,
            messages,
            updated_at: new Date().toISOString(),
        }).catch(() => undefined);
    }, [messages, userId]);
    const promptSuggestion = useMemo(() => {
        if (contextSummary) {
            return 'Explain the methodology in this paper.';
        }
        return 'Summarize this paper in plain language.';
    }, [contextSummary]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!input.trim()) {
            return;
        }
        const userMessage = createMessage('user', input.trim());
        const history = messages.concat(userMessage);
        setMessages(history);
        setInput('');
        setLoading(true);
        try {
            const response = await fetch('/api/ai-assistant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage.content,
                    history: history.map((message) => ({ role: message.role, content: message.content })),
                    context: contextSummary,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Unable to generate a response.');
            }
            setMessages((current) => [...current, createMessage('assistant', data.reply)]);
        }
        catch (error) {
            setMessages((current) => [...current, createMessage('assistant', error instanceof Error ? error.message : 'Unable to generate a response.')]);
        }
        finally {
            setLoading(false);
        }
    };
    return (<main className="section-shell py-10 lg:py-14">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-5">
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-200">
                <BrainCircuit className="h-5 w-5"/>
              </div>
              <div>
                <p className="text-lg font-semibold text-white">Research assistant</p>
                <p className="text-sm text-slate-400">Powered by Gemini</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Ask about a paper, its methodology, figures, tables, equations, or literature comparisons. The assistant uses the current paper context automatically when available.
            </p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
              {contextSummary ? <p>{contextSummary}</p> : <p>No paper context yet. Open a paper and choose Ask AI to attach it.</p>}
            </div>
          </div>

          <div className="glass-panel p-6">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Sparkles className="h-4 w-4 text-brand-300"/>
              Try asking
            </div>
            <div className="mt-4 space-y-2">
              {[promptSuggestion, 'Compare this paper with a related study.', 'Explain Figure 2 in plain language.'].map((suggestion) => (<button key={suggestion} type="button" onClick={() => setInput(suggestion)} className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-left text-sm text-slate-300 transition hover:border-white/20 hover:text-white">
                  {suggestion}
                </button>))}
            </div>
          </div>
        </aside>

        <section className="glass-panel flex min-h-[640px] flex-col p-4 sm:p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Conversation</p>
              <h1 className="mt-1 text-2xl font-semibold text-white">Research questions</h1>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">Secure AI session</div>
          </div>

          <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1">
            {messages.map((message) => (<div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-7 ${message.role === 'user' ? 'bg-brand-500 text-white' : 'border border-white/10 bg-white/5 text-slate-300'}`}>
                  {message.content}
                </div>
              </div>))}
            {loading ? (<div className="flex justify-start">
                <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                  <span className="inline-flex items-center gap-2"><Bot className="h-4 w-4 animate-pulse"/> Thinking…</span>
                </div>
              </div>) : null}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row">
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about a paper, methodology, results, or a scientific concept" className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"/>
            <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60">
              <Send className="h-4 w-4"/>
              {loading ? 'Thinking…' : 'Send'}
            </button>
          </form>
        </section>
      </div>
    </main>);
}

export default function AIAssistantPage() {
  return (<Suspense fallback={<main className="section-shell py-10 lg:py-14"><div className="glass-panel p-6 text-slate-300">Loading research assistant...</div></main>}><AIAssistantContent /></Suspense>);
}
