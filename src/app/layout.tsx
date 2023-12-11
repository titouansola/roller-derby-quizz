import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@internals/components/header/header.component';
import cn from 'clsx';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Roller Derby Quizz',
  description: '',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <body className={cn(inter.className, 'bg-background')}>
        <Header />
        <main className="flex flex-col items-center w-full px-8 py-20 gap-3">
          {children}
        </main>
      </body>
    </html>
  );
}
