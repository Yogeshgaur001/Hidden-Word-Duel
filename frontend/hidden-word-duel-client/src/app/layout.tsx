import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css'; // Ensure Tailwind is imported
import { GameProvider } from '@/contexts/GameContext'; // Import GameProvider

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hidden Word Duel',
  description: 'Real-time multiplayer word guessing game.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-darkBg text-lightText min-h-screen flex flex-col`}>
        <GameProvider> {/* Wrap children with GameProvider */}
          <header className="p-4 bg-gray-800 shadow-md">
            <h1 className="text-3xl font-bold text-center text-primary">Hidden Word Duel</h1>
          </header>
          <main className="flex-grow container mx-auto p-4">
            {children}
          </main>
          <footer className="p-4 bg-gray-800 text-center text-sm text-gray-400">
           
          </footer>
        </GameProvider>
      </body>
    </html>
  );
}