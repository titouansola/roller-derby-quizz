'use client';

import { PropsWithChildren } from 'react';
import { Inter } from 'next/font/google';
import cn from 'clsx';
import { Header } from '@internals/common/components/header/header.component';
import { Footer } from '@internals/common/components/footer/footer.component';
import { Toaster } from '@internals/common/components/ui/toaster.component';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <head>
        <title>Roller Derby Quizz</title>
      </head>
      <body
        className={cn(
          inter.className,
          'bg-background flex flex-col min-h-screen',
        )}
      >
        <Header />
        <main className="flex flex-col items-center w-full px-8 py-10 gap-3 grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
