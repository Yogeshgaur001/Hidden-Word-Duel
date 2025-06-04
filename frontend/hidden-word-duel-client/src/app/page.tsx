'use client'; // Required for hooks

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/contexts/GameContext';
import { useWebSocket } from '@/hooks/useWebSocket'; // Initialize WS connection here or in GamePage
import NotificationBar from '@/components/ui/notificationBar';

export default function HomePage() {
  const { state } = useGame();
  const router = useRouter();

  // Initialize WebSocket connection when component mounts or when game status is appropriate
  // The useWebSocket hook itself handles initialization on mount
  // We just call it here to make sure it's active.
  useWebSocket(); // This will trigger connection attempt

  useEffect(() => {
    // If a round starts, navigate to the game page
    if (state.gameStatus === 'playing' || state.gameStatus === 'roundOver') {
      router.push('/game');
    }
  }, [state.gameStatus, router]);

  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
      <NotificationBar />
      {state.gameStatus === 'lobby' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Welcome to Hidden Word Duel!</h2>
          <p className="text-lg">Connecting to the server...</p>
          <div className="animate-pulse">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full inline-block animate-spin"></div>
          </div>
        </div>
      )}
      {state.gameStatus === 'waiting' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Waiting for an Opponent</h2>
          <p className="text-lg">Hang tight, we're finding someone for you to duel!</p>
          <div className="animate-pulse">
            <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full inline-block animate-spin"></div>
          </div>
        </div>
      )}
       {/* Could add a button to manually join if that's part of the flow */}
    </div>
  );
}