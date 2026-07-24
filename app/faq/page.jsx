const faqs = [
    {
        question: 'What makes Researchora different from a traditional research feed?',
        answer: 'It is designed as a social, discovery-first space where researchers can share updates, spark discussion, and find relevant communities without feeling buried in noise.',
    },
    {
        question: 'Can I share more than a short post?',
        answer: 'Yes. The experience supports quick updates, deeper study summaries, and conversation starters that can evolve into richer discussions.',
    },
    {
        question: 'Is the experience built for mobile?',
        answer: 'Absolutely. The layout is responsive and easy to navigate from a phone, tablet, or desktop.',
    },
];
export const metadata = {
    title: 'FAQ | Researchora',
    description: 'Answers to the most common questions about Researchora.',
};
export default function FAQPage() {
    return (<main className="section-shell py-24 sm:py-28">
      <div className="glass-panel p-8 sm:p-12">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-300">FAQ</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Questions, answered clearly.</h1>
        <div className="mt-10 space-y-4">
          {faqs.map((item) => (<details key={item.question} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <summary className="cursor-pointer text-lg font-medium text-white">{item.question}</summary>
              <p className="mt-3 text-slate-400">{item.answer}</p>
            </details>))}
        </div>
      </div>
    </main>);
}
