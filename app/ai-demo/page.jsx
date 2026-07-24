import { BrainCircuit, MessageSquareText, Sparkles } from 'lucide-react';
export const metadata = {
    title: 'AI Demo | Researchora',
    description: 'Experience a polished AI-assisted workflow in a lightweight, launch-ready interface.',
};
export default function AIDemoPage() {
    return (<main className="section-shell py-24 sm:py-28">
      <div className="glass-panel overflow-hidden p-8 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-brand-300">AI demo</p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">A thoughtful assistant experience that feels instantly useful.</h1>
            <p className="mt-6 text-lg leading-8 text-slate-400">The demo highlights how Researchora can guide users with summaries, explanations, and next-step recommendations in a calm, premium format.</p>
            <div className="mt-8 space-y-4">
              {[
            { title: 'Summarize a document', icon: BrainCircuit },
            { title: 'Explain a complex idea', icon: MessageSquareText },
        ].map((item) => {
            const Icon = item.icon;
            return (<div key={item.title} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
                    <Icon className="h-5 w-5 text-brand-300"/>
                    {item.title}
                  </div>);
        })}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Sparkles className="h-4 w-4 text-brand-300"/> Researchora assistant
            </div>
            <textarea className="mt-4 min-h-36 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none" defaultValue="What are the top three opportunities for a new AI research product?"/>
            <div className="mt-4 rounded-2xl border border-brand-500/20 bg-brand-500/10 p-4 text-sm text-slate-300">
              <p className="font-medium text-white">Suggested output</p>
              <p className="mt-2 text-slate-400">Lead with clarity, reduce setup friction, and show the product as a calm partner for discovery and decision-making.</p>
            </div>
          </div>
        </div>
      </div>
    </main>);
}
