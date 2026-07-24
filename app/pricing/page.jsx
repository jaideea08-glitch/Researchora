import { CheckCircle2 } from 'lucide-react';
export const metadata = {
    title: 'Community plans | Researchora',
    description: 'Explore the ways researchers can grow their presence and participation on Researchora.',
};
export default function PricingPage() {
    return (<main className="section-shell py-24 sm:py-28">
      <div className="glass-panel p-8 sm:p-12">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-300">Community plans</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Choose a rhythm that fits how you share and connect.</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { name: 'Explore', price: 'Free', perks: ['Share study updates', 'Join public discussions', 'Follow emerging topics'] },
            { name: 'Grow', price: '$12', perks: ['Pinned posts', 'Priority visibility', 'Custom community lists'] },
            { name: 'Lead', price: '$29', perks: ['Host discussion circles', 'Advanced analytics', 'Collaborator invites'] },
        ].map((plan) => (<div key={plan.name} className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
              <p className="mt-6 text-4xl font-semibold text-white">{plan.price}<span className="text-base text-slate-400">/mo</span></p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {plan.perks.map((perk) => (<li key={perk} className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-brand-300"/> {perk}</li>))}
              </ul>
            </div>))}
        </div>
      </div>
    </main>);
}
