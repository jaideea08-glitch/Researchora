import { Inter } from 'next/font/google';
import './globals.css';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
export const metadata = {
    title: 'Researchora | Social platform for researchers',
    description: 'A polished social space where researchers share studies, notes, findings, and ideas with the community.',
    keywords: ['research', 'social platform', 'study sharing', 'academia', 'community'],
    openGraph: {
        title: 'Researchora',
        description: 'Share your study. Start a conversation.',
        type: 'website',
    },
};
export default function RootLayout({ children }) {
    return (<html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <div className="flex min-h-screen flex-col">
          <SiteNav />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>);
}
