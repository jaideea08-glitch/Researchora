import Link from 'next/link';
import { ArrowRight, Brain, Compass, Flame, MessageCircleMore, PlusCircle, Sparkles, Users } from 'lucide-react';
import { AuthPanel } from '@/components/AuthPanel';
import { PostComposer } from '@/components/PostComposer';
import { supabase } from '@/lib/supabaseClient';
const trendingTopics = ['AI in biomedicine', 'Open science', 'Climate models', 'Computational linguistics'];
async function getPosts() {
    if (!supabase) {
        return { posts: null, error: 'Supabase client is not configured.' };
    }
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
    if (error) {
        console.error('Supabase error:', error.message);
        return { posts: null, error: error.message };
    }
    return { posts: data !== null && data !== void 0 ? data : [], error: null };
}
const suggestedPeople = [
    { name: 'Leah Ortiz', role: 'Bioinformatics', badge: 'Active today' },
    { name: 'Trevor Hall', role: 'Social Science', badge: '2 new studies' },
    { name: 'Sana Patel', role: 'Physics', badge: 'Top contributor' },
];
export default async function HomePage() {
    const { posts: feedPosts, error: feedError } = await getPosts();
    return (<main className="relative overflow-hidden">
      <section className="section-shell relative py-20 sm:py-24 lg:py-28">
        <div className="absolute inset-x-0 top-0 -z-10 h-[480px] rounded-full bg-brand-500/20 blur-3xl"/>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-200 backdrop-blur">
              <Sparkles className="mr-2 h-4 w-4 text-brand-300"/>
              Research social for curious minds
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Share your study. Start a conversation.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Researchora is a polished social space where scholars, students, and research teams post findings, exchange notes, and discover the next great idea.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="#composer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-slate-950 transition hover:scale-[1.01]">
                Post a study <PlusCircle className="h-4 w-4"/>
              </Link>
              <Link href="#discover" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-5 py-3 font-medium text-slate-200 backdrop-blur transition hover:border-white/20">
                Explore feed <ArrowRight className="h-4 w-4"/>
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
            { value: '12k+', label: 'research posts' },
            { value: '4.8/5', label: 'community rating' },
            { value: '24/7', label: 'discussion flow' },
        ].map((item) => (<div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.label}</p>
                </div>))}
            </div>
          </div>

          <div className="glass-panel p-6 sm:p-8 space-y-6">
            <AuthPanel />
            <div id="composer">
              <PostComposer />
            </div>
          </div>
        </div>
      </section>

      <section id="discover" className="section-shell py-8 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Latest researcher posts</h2>
              <Link href="/features" className="text-sm text-slate-400 transition hover:text-white">View all</Link>
            </div>

            {feedError ? (<div className="glass-panel p-6 text-slate-300">
                <p className="font-semibold text-white">Supabase error</p>
                <p>{feedError}</p>
                <p className="mt-3 text-sm text-slate-400">
                  Create the `posts` table in Supabase using `supabase-schema.sql`, then refresh the page.
                </p>
              </div>) : feedPosts === null ? (<div className="glass-panel p-6 text-slate-300">
                Supabase client is not configured. Check your environment variables.
              </div>) : feedPosts.length === 0 ? (<div className="glass-panel p-6 text-slate-300">No posts yet — connect your Supabase database and add a post to see them here.</div>) : (feedPosts.map((post) => (<article key={post.id} className="glass-panel p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">{post.author}</p>
                      <p className="text-sm text-slate-400">{post.role}</p>
                    </div>
                    <div className="rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-xs text-brand-200">New</div>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{post.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{post.body}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1"><MessageCircleMore className="h-4 w-4"/> {post.stats}</span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1"><Brain className="h-4 w-4"/> AI-assisted summary</span>
                  </div>
                </article>)))}
          </div>

          <div className="space-y-6">
            <div className="glass-panel p-6">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Flame className="h-4 w-4 text-amber-300"/>
                Trending topics
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {trendingTopics.map((topic) => (<span key={topic} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">#{topic}</span>))}
              </div>
            </div>

            <div className="glass-panel p-6">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Users className="h-4 w-4 text-brand-300"/>
                People to follow
              </div>
              <div className="mt-5 space-y-3">
                {suggestedPeople.map((person) => (<div key={person.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{person.name}</p>
                      <p className="text-sm text-slate-400">{person.role}</p>
                    </div>
                    <span className="text-xs text-slate-400">{person.badge}</span>
                  </div>))}
              </div>
            </div>

            <div className="glass-panel p-6">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Compass className="h-4 w-4 text-brand-300"/>
                Discover communities
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
                Join spaces around open science, experimental methods, and cross-disciplinary collaboration.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>);
}
