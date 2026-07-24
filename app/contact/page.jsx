import { Mail, Send } from 'lucide-react';
export const metadata = {
    title: 'Contact | Researchora',
    description: 'Get in touch with the Researchora team.',
};
export default function ContactPage() {
    return (<main className="section-shell py-24 sm:py-28">
      <div className="glass-panel p-8 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-brand-300">Contact</p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Let’s talk about the next conversation you want to start.</h1>
            <p className="mt-6 text-lg leading-8 text-slate-400">Whether you are building a new research community or looking for a better way to share work, we would love to hear from you.</p>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
              <Mail className="h-4 w-4 text-brand-300"/>
              hello@researchora.ai
            </div>
          </div>
          <form className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" placeholder="Name"/>
              <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" placeholder="Email"/>
            </div>
            <textarea className="mt-4 min-h-32 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" placeholder="Tell us what kind of research community you want to build."/>
            <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-medium text-white">
              Send message <Send className="h-4 w-4"/>
            </button>
          </form>
        </div>
      </div>
    </main>);
}
