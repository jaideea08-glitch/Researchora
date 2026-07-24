'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Bookmark, BrainCircuit, Clock3, Compass, FileText, Flame, Lightbulb, MessageCircleMore, PlusCircle, Sparkles, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
const initialPapers = [
    {
        id: 'paper-1',
        title: 'Adaptive Representation Learning for Longitudinal Biomedical Signals',
        authors: 'Mina Alvarez, R. Chen, D. Patel',
        institution: 'Harvard Medical School',
        journal: 'Nature Biomedical Engineering',
        publishedAt: 'Feb 2026',
        field: 'Bioinformatics',
        doi: '10.1038/s41551-025-01442-8',
        readingTime: '11 min',
        abstract: 'This study introduces a representation framework that adapts across time and patient-specific signal drift, improving late-stage disease detection for multimodal imaging data.',
        tags: ['multimodal', 'clinical AI', 'transformers'],
        citations: 184,
        bookmarks: 326,
    },
    {
        id: 'paper-2',
        title: 'Mechanistic Interpretability for Scientific Foundation Models',
        authors: 'L. Osei, S. Kim, K. Green',
        institution: 'Stanford HAI',
        journal: 'Science Advances',
        publishedAt: 'Jan 2026',
        field: 'Machine Learning',
        doi: '10.1126/sciadv.adi7992',
        readingTime: '8 min',
        abstract: 'The authors compare latent steering methods across scientific foundation models and demonstrate fidelity gains for hypothesis generation tasks.',
        tags: ['interpretability', 'foundation models', 'science'],
        citations: 129,
        bookmarks: 211,
    },
    {
        id: 'paper-3',
        title: 'Climate Resilience Forecasting with Hybrid Ocean-Atmosphere Models',
        authors: 'E. Brooks, H. Yao',
        institution: 'MIT CSAIL',
        journal: 'Journal of Climate',
        publishedAt: 'Dec 2025',
        field: 'Climate Science',
        doi: '10.1175/JCLI-D-25-0412.1',
        readingTime: '14 min',
        abstract: 'A hybrid model blends physics-based constraints and learned corrections to improve seasonal forecasting under shifting climate regimes.',
        tags: ['climate', 'forecasting', 'physics-informed'],
        citations: 96,
        bookmarks: 158,
    },
    {
        id: 'paper-4',
        title: 'Ethical Dataset Auditing for Domain-Specific Language Models',
        authors: 'N. Flores, P. Rios',
        institution: 'University of Toronto',
        journal: 'ACL Findings',
        publishedAt: 'Nov 2025',
        field: 'Computational Linguistics',
        readingTime: '7 min',
        abstract: 'The paper outlines a lightweight auditing protocol for detecting representational drift and lexical imbalance in research-oriented language models.',
        tags: ['ethics', 'NLP', 'evaluation'],
        citations: 73,
        bookmarks: 142,
    },
    {
        id: 'paper-5',
        title: 'Robust Multi-Agent Planning for Autonomous Labs',
        authors: 'A. Drost, L. Wong, T. Singh',
        institution: 'Caltech',
        journal: 'Nature Machine Intelligence',
        publishedAt: 'Oct 2025',
        field: 'Robotics',
        doi: '10.1038/s42256-025-01124-7',
        readingTime: '12 min',
        abstract: 'The study demonstrates cooperative planning policies that reduce failure rates for robotic experimentation under resource uncertainty.',
        tags: ['robotics', 'multi-agent', 'autonomy'],
        citations: 88,
        bookmarks: 134,
    },
    {
        id: 'paper-6',
        title: 'Single-Cell Trajectory Inference with Low-Signal Measurements',
        authors: 'J. Rivera, M. Noor',
        institution: 'Broad Institute',
        journal: 'Cell Systems',
        publishedAt: 'Sep 2025',
        field: 'Biotechnology',
        doi: '10.1016/j.cels.2025.09.007',
        readingTime: '9 min',
        abstract: 'A new inference method recovers dynamic gene programs in noisy single-cell experiments without relying on dense temporal sampling.',
        tags: ['single-cell', 'omics', 'inference'],
        citations: 112,
        bookmarks: 196,
    },
];
const suggestedResearchers = [
    { name: 'Alicia Brooks', institution: 'MIT', field: 'Computational Biology', accent: 'AI' },
    { name: 'Noah Patel', institution: 'Oxford', field: 'Climate Systems', accent: 'CL' },
    { name: 'Daria Kim', institution: 'ETH Zurich', field: 'Human-Centered AI', accent: 'HCI' },
];
const trendingTopics = [
    { name: 'Artificial Intelligence', count: '1.8k papers' },
    { name: 'Medicine', count: '1.2k papers' },
    { name: 'Machine Learning', count: '960 papers' },
    { name: 'Robotics', count: '730 papers' },
    { name: 'Climate Science', count: '610 papers' },
    { name: 'Biotechnology', count: '504 papers' },
];
const quickShortcuts = [
    { label: 'New note', icon: PlusCircle },
    { label: 'Saved papers', icon: Bookmark },
    { label: 'Ask AI', icon: BrainCircuit },
];
function SkeletonCard() {
    return (<div className="animate-pulse rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
      <div className="h-4 w-28 rounded-full bg-white/10"/>
      <div className="mt-4 h-5 w-3/4 rounded-full bg-white/10"/>
      <div className="mt-3 h-4 w-full rounded-full bg-white/10"/>
      <div className="mt-2 h-4 w-2/3 rounded-full bg-white/10"/>
      <div className="mt-6 h-10 w-full rounded-2xl bg-white/10"/>
    </div>);
}
export function ResearchHome() {
    const router = useRouter();
    const [visibleCount, setVisibleCount] = useState(4);
    const [loadingMore, setLoadingMore] = useState(false);
    const visiblePapers = useMemo(() => initialPapers.slice(0, visibleCount), [visibleCount]);
    useEffect(() => {
        const element = document.getElementById('home-feed-sentinel');
        if (!element) {
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            var _a;
            if (((_a = entries[0]) === null || _a === void 0 ? void 0 : _a.isIntersecting) && visibleCount < initialPapers.length && !loadingMore) {
                setLoadingMore(true);
                window.setTimeout(() => {
                    setVisibleCount((current) => Math.min(current + 2, initialPapers.length));
                    setLoadingMore(false);
                }, 600);
            }
        }, { rootMargin: '220px' });
        observer.observe(element);
        return () => observer.disconnect();
    }, [loadingMore, visibleCount]);
    const handleAskAi = (paper) => {
        const context = `Paper title: ${paper.title}\nAuthors: ${paper.authors}\nAbstract: ${paper.abstract}`;
        router.push(`/ai-assistant?paper=${encodeURIComponent(paper.title)}&context=${encodeURIComponent(context)}`);
    };
    return (<main className="relative overflow-hidden">
      <section className="section-shell relative py-8 lg:py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-200 backdrop-blur">
              <Sparkles className="h-4 w-4 text-brand-300"/>
              Home dashboard
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Your research orbit, curated daily.</h1>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
            <p className="font-semibold text-white">Reading streak</p>
            <p className="mt-1">12 days strong</p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.85fr_1.4fr_0.8fr]">
          <aside className="space-y-5">
            <div className="glass-panel p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-200">
                  <BookOpen className="h-5 w-5"/>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Dr. Maya Singh</p>
                  <p className="text-sm text-slate-400">Computational Biology</p>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-slate-400">Saved papers</p>
                  <p className="mt-1 text-lg font-semibold text-white">28</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-slate-400">Recent activity</p>
                  <p className="mt-1 text-white">Reviewed 3 methods sections today</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-5">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock3 className="h-4 w-4 text-brand-300"/>
                Reading streak & in progress
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="font-semibold text-white">12-day streak</p>
                  <p className="mt-1 text-slate-400">Keep your momentum with 20 minutes of reading.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="font-semibold text-white">Papers in progress</p>
                  <p className="mt-1 text-slate-400">4 active reads • 2 highlights added</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-5">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Lightbulb className="h-4 w-4 text-amber-300"/>
                Favorite topics
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Interpretability', 'Single-cell', 'Climate resilience', 'Scientific AI'].map((topic) => (<span key={topic} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">{topic}</span>))}
              </div>
            </div>

            <div className="glass-panel p-5">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Compass className="h-4 w-4 text-brand-300"/>
                Quick shortcuts
              </div>
              <div className="mt-4 space-y-2">
                {quickShortcuts.map((shortcut) => {
            const Icon = shortcut.icon;
            return (<button key={shortcut.label} type="button" className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-left text-sm text-slate-300 transition hover:border-white/20 hover:text-white">
                      <span className="inline-flex items-center gap-2">
                        <Icon className="h-4 w-4"/>
                        {shortcut.label}
                      </span>
                      <span className="text-slate-500">↗</span>
                    </button>);
        })}
              </div>
            </div>
          </aside>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Recommended papers</p>
                <h2 className="mt-1 text-2xl font-semibold text-white">Fresh reads for your current focus</h2>
              </div>
              <Link href="/reading-history" className="text-sm text-slate-400 transition hover:text-white">View archive</Link>
            </div>

            <AnimatePresence mode="popLayout">
              {visiblePapers.map((paper) => (<motion.article key={paper.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }} className="glass-panel p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-brand-200">{paper.field}</p>
                      <h3 className="mt-2 text-xl font-semibold text-white">{paper.title}</h3>
                      <p className="mt-2 text-sm text-slate-400">{paper.authors} • {paper.institution}</p>
                    </div>
                    <div className="rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-200">
                      {paper.journal}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-400">
                    <span className="rounded-full bg-white/5 px-3 py-1">{paper.publishedAt}</span>
                    <span className="rounded-full bg-white/5 px-3 py-1">{paper.readingTime}</span>
                    {paper.doi ? <span className="rounded-full bg-white/5 px-3 py-1">DOI {paper.doi}</span> : null}
                  </div>

                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-300">{paper.abstract}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {paper.tags.map((tag) => (<span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">#{tag}</span>))}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
                      <MessageCircleMore className="h-4 w-4"/>
                      {paper.citations} citations
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
                      <Bookmark className="h-4 w-4"/>
                      {paper.bookmarks} saved
                    </span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button type="button" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:text-white">
                      <BookOpen className="h-4 w-4"/> Read paper
                    </button>
                    <button type="button" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:text-white">
                      <Bookmark className="h-4 w-4"/> Save
                    </button>
                    <button type="button" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:text-white">
                      <FileText className="h-4 w-4"/> Cite
                    </button>
                    <button type="button" onClick={() => handleAskAi(paper)} className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-brand-400">
                      <BrainCircuit className="h-4 w-4"/> Ask AI
                    </button>
                  </div>
                </motion.article>))}
            </AnimatePresence>

            <div id="home-feed-sentinel" className="flex items-center justify-center py-2">
              {loadingMore ? <SkeletonCard /> : visibleCount < initialPapers.length ? <p className="text-sm text-slate-400">Scroll for more papers</p> : <p className="text-sm text-slate-500">You are up to date.</p>}
            </div>
          </section>

          <aside className="space-y-5">
            <div className="glass-panel p-5">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Users className="h-4 w-4 text-brand-300"/>
                Suggested researchers
              </div>
              <div className="mt-4 space-y-3">
                {suggestedResearchers.map((person) => (<div key={person.name} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{person.name}</p>
                        <p className="text-sm text-slate-400">{person.institution}</p>
                      </div>
                      <div className="rounded-full bg-brand-500/15 px-3 py-1 text-xs text-brand-200">{person.accent}</div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-sm text-slate-400">{person.field}</p>
                      <button type="button" className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200 transition hover:text-white">Follow</button>
                    </div>
                  </div>))}
              </div>
            </div>

            <div className="glass-panel p-5">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Flame className="h-4 w-4 text-amber-300"/>
                Trending research topics
              </div>
              <div className="mt-4 space-y-3">
                {trendingTopics.map((topic) => (<div key={topic.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3 text-sm">
                    <div>
                      <p className="font-semibold text-white">{topic.name}</p>
                      <p className="text-slate-400">{topic.count}</p>
                    </div>
                    <TrendingUp className="h-4 w-4 text-brand-300"/>
                  </div>))}
              </div>
            </div>

            <div className="glass-panel p-5">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Sparkles className="h-4 w-4 text-brand-300"/>
                Recommended for you
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="font-semibold text-white">Human-centered evaluation of foundation models</p>
                  <p className="mt-2 text-slate-400">Based on your recent reading history and current tags.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="font-semibold text-white">Interpretable uncertainty in scientific AI</p>
                  <p className="mt-2 text-slate-400">A strong complement to your current bibliography.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>);
}
