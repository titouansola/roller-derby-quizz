import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Roller Derby Quizz',
  description: '',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
