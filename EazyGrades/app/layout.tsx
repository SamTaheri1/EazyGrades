import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: {default:'EazyGrades — Focused exam practice',template:'%s | EazyGrades'}, description:'AI-generated exam-style practice PDFs focused on computer science and software engineering, with engineering core practice. Independent educational material for focused study and revision.' };
export default function RootLayout({ children }: {children: React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
