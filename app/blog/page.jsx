const posts = [
    {
        title: 'Designing calm AI experiences',
        excerpt: 'How premium visual language can make intelligent interfaces feel approachable and trustworthy.',
    },
    {
        title: 'Why founders love lightweight demos',
        excerpt: 'A clear, consultative product story can outperform overbuilt prototypes in early conversations.',
    },
];
export const metadata = {
    title: 'Blog | Researchora',
    description: 'Read thoughtful updates from the Researchora team.',
};
export default function BlogPage() {
    return (<main className="section-shell py-24 sm:py-28">
      <div className="glass-panel p-8 sm:p-12">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-300">Blog</p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Updates and perspective for modern product teams.</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (<article key={post.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">{post.title}</h2>
              <p className="mt-3 text-slate-400">{post.excerpt}</p>
            </article>))}
        </div>
      </div>
    </main>);
}
