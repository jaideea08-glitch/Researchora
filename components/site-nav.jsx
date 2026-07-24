"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, MoonStar, Sparkles, SunMedium } from 'lucide-react';
import { useEffect, useState } from 'react';
const links = [
    { href: '/home', label: 'Home' },
    { href: '/following', label: 'Following' },
    { href: '/reading-history', label: 'Reading History' },
    { href: '/ai-assistant', label: 'AI Assistant' },
];
export function SiteNav() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useState('dark');
    useEffect(() => {
        const storedTheme = window.localStorage.getItem('theme');
        const initialTheme = storedTheme !== null && storedTheme !== void 0 ? storedTheme : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setTheme(initialTheme);
        document.documentElement.dataset.theme = initialTheme;
    }, []);
    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        document.documentElement.dataset.theme = nextTheme;
        window.localStorage.setItem('theme', nextTheme);
    };
    const isActive = (href) => pathname === href || (href !== '/' && pathname.startsWith(href));
    return (<header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-300">
            <Sparkles className="h-5 w-5"/>
          </div>
          <span className="text-lg font-semibold">Researchora</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (<Link key={link.href} href={link.href} className={`text-sm transition ${active ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
                {link.label}
              </Link>);
        })}
        </nav>

        <div className="flex items-center gap-2">
          <button aria-label="Toggle color theme" className="rounded-full border border-white/10 p-2 text-slate-200" onClick={toggleTheme}>
            {theme === 'dark' ? <MoonStar className="h-4 w-4"/> : <SunMedium className="h-4 w-4"/>}
          </button>
          <button aria-label="Open navigation" className="rounded-full border border-white/10 p-2 text-slate-200 lg:hidden" onClick={() => setOpen((value) => !value)}>
            <Menu className="h-5 w-5"/>
          </button>
        </div>
      </div>

      {open ? (<div className="border-t border-white/10 bg-slate-950/95 px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (<Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={`text-sm ${isActive(link.href) ? 'text-white' : 'text-slate-400'}`}>
                {link.label}
              </Link>))}
          </nav>
        </div>) : null}
    </header>);
}
