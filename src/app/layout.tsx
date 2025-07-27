'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import LoadingScreen from '@/components/LoadingScreen';
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingScreen 
          isLoading={isLoading} 
          onComplete={() => setIsLoading(false)} 
        />
        
        {!isLoading && (
          <>
            <Navigation />
            <main className="lg:ml-80 min-h-screen pt-16 pb-20 lg:pt-0 lg:pb-0">
              <div className="p-6 lg:p-8">
                {children}
              </div>
            </main>
          </>
        )}
      </body>
    </html>
  );
}