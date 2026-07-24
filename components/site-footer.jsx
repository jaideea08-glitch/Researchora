import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
export function SiteFooter() {
    return (<footer className="border-t border-white/10 bg-slate-950/80">
      <div className="section-shell py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-300">
                <Sparkles className="h-5 w-5"/>
              </div>
              <span className="text-lg font-semibold">Researchora</span>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">A social platform for researchers to share studies, ideas, and discoveries with a calm, modern community experience.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <Link href="/features" className="transition hover:text-white">Features</Link>
            <Link href="/pricing" className="transition hover:text-white">Pricing</Link>
            <Link href="/faq" className="transition hover:text-white">FAQ</Link>
            <Link href="/contact" className="transition hover:text-white">Contact</Link>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">Ready to shape the story?</p>
            <p className="mt-1 text-sm text-slate-400">Bring your next product idea to life with a polished, AI-supported experience.</p>
          </div>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950">
            Start a conversation <ArrowRight className="h-4 w-4"/>
          </Link>
        </div>
      </div>
    </footer>);
}
