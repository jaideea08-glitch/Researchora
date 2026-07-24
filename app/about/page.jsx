import Link from 'next/link';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
export const metadata = {
    title: 'Communities | Researchora',
    description: 'Learn how Researchora helps researchers build communities around ideas and discovery.',
};
export default function AboutPage() {
    return (<main className="section-shell py-24 sm:py-28">
      <div className="glass-panel p-8 sm:p-12 lg:p-16">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-300">Communities</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">A home for researchers who want to share work and spark better conversations.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">Researchora exists to make scholarly exchange feel lighter, more visible, and more connected. It brings together thoughtful design and a feed-based experience that encourages discovery without losing depth.</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-300"><Compass className="h-6 w-6"/></div>
            <h2 className="mt-6 text-2xl font-semibold text-white">A sharper way to discover work</h2>
            <p className="mt-3 text-slate-400">Researchers can surface new studies, follow relevant voices, and stay connected to the questions shaping their field.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-300"><Sparkles className="h-6 w-6"/></div>
            <h2 className="mt-6 text-2xl font-semibold text-white">A calm foundation for collaboration</h2>
            <p className="mt-3 text-slate-400">The interface is designed to feel welcoming and polished while supporting longer conversations around ideas and feedback.</p>
          </div>
        </div>
        <Link href="/" className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-slate-950">
          Return home <ArrowRight className="h-4 w-4"/>
        </Link>
      </div>
    </main>);
}
