import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
export default function NotFound() {
    return (<main className="section-shell flex min-h-screen items-center justify-center py-24">
      <div className="glass-panel p-10 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-300">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">This page has gone missing.</h1>
        <p className="mt-4 text-slate-400">The link you followed may be outdated or the page may have moved.</p>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-slate-950">
          <ArrowLeft className="h-4 w-4"/> Back home
        </Link>
      </div>
    </main>);
}
