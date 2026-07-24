import { Compass, MessageSquareText, Sparkles, Users } from 'lucide-react';
const items = [
    {
        title: 'Share your study',
        description: 'Publish a short update, findings snapshot, or discussion prompt in seconds.',
        icon: Sparkles,
    },
    {
        title: 'Join the conversation',
        description: 'Comment, ask questions, and connect with researchers across disciplines.',
        icon: MessageSquareText,
    },
    {
        title: 'Find your people',
        description: 'Discover communities, collaborators, and trending topics that match your interests.',
        icon: Users,
    },
];
export const metadata = {
    title: 'Discover | Researchora',
    description: 'Explore the research-focused features that make sharing and discovery feel natural.',
};
export default function FeaturesPage() {
    return (<main className="section-shell py-24 sm:py-28">
      <div className="glass-panel p-8 sm:p-12">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-300">Discover</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">A calmer way to share, discover, and discuss research.</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (<div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-300"><Icon className="h-6 w-6"/></div>
                <h2 className="mt-6 text-xl font-semibold text-white">{item.title}</h2>
                <p className="mt-3 text-slate-400">{item.description}</p>
              </div>);
        })}
        </div>
        <div className="mt-10 rounded-3xl border border-brand-500/20 bg-brand-500/10 p-6 text-slate-300">
          <div className="flex items-center gap-2 text-brand-200"><Compass className="h-4 w-4"/> Built for research communities</div>
          <p className="mt-3 max-w-2xl text-slate-400">Researchora helps thoughtful work travel farther, inviting feedback, collaboration, and momentum around the ideas that matter.</p>
        </div>
      </div>
    </main>);
}
