import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@internals/components/header.component';
import './globals.css';
import cn from 'clsx';

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
        {children}
      </body>
    </html>
  );
}
