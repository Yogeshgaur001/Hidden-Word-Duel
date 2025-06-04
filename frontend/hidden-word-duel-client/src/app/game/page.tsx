'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/contexts/GameContext';
import { useWebSocket } from '@/hooks/useWebSocket';
import WordDisplay from '@/components/game/WordDisplay';
import GuessInput from '@/components/game/GuessInput';
import TimerDisplay from '@/components/game/TimerDisplay';
import Scoreboard from '@/components/game/Scoreboard';
import PlayerStatus from '@/components/game/PlayerStatus';
import NotificationBar from '@/components/ui/notificationBar';
import Button from '@/components/ui/Button'; // Assuming you have a generic button

export default function GamePage() {
  const { state, dispatch } = useGame();
  const { submitGuess } = useWebSocket(); // Get submitGuess function
  const router = useRouter();

  useEffect(() => {
    // If not in a game state, redirect to lobby (e.g., on refresh or direct access)
    if (state.gameStatus === 'lobby' && !state.roundId) {
      // router.push('/'); // Or handle re-joining logic if possible
    }
  }, [state.gameStatus, state.roundId, router]);


  const handleNextRound = () => {
    // This might be triggered by server or a client action if needed
    // For now, assume server sends `startRound` automatically
    dispatch({ type: 'SET_NOTIFICATION', payload: { type: 'info', message: 'Waiting for next round...' } });
  };

  const handlePlayAgain = () => {
    // This would ideally involve telling the server the player wants to play again
    // For simplicity, we might just reset to lobby state and wait for server to pair again
    // socketRef.current?.emit('requestNewMatch'); // Example
    dispatch({ type: 'CONNECTING' }); // Reset state
    router.push('/');
  };


  if (state.gameStatus === 'lobby' || (!state.roundId && state.gameStatus !== 'matchOver')) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full">
         <NotificationBar />
        <p className="text-xl">Loading game or returning to lobby...</p>
        <div className="animate-pulse mt-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full inline-block animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-4 md:p-8">
      <NotificationBar />
      <Scoreboard />

      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-xl">
        {state.gameStatus === 'playing' || state.gameStatus === 'roundOver' ? (
          <>
            <TimerDisplay />
            <WordDisplay />
            {state.gameStatus === 'playing' && state.isTickActive && !state.guessSubmittedThisTick && (
              <GuessInput
                onSubmit={(guess) => state.roundId && submitGuess(state.roundId, guess)}
                disabled={!state.isTickActive || state.guessSubmittedThisTick}
              />
            )}
            {state.gameStatus === 'playing' && state.isTickActive && state.guessSubmittedThisTick && (
                <p className="text-center text-accent mt-4">Guess submitted! Waiting for tick to end...</p>
            )}
            {state.gameStatus === 'playing' && !state.isTickActive && (
                <p className="text-center text-gray-400 mt-4">Waiting for next letter reveal...</p>
            )}
          </>
        ) : null}

        {state.gameStatus === 'roundOver' && (
          <div className="text-center mt-6">
            {state.roundWinner === 'draw' && <p className="text-2xl text-yellow-400">Round Draw!</p>}
            {state.roundWinner && state.roundWinner !== 'draw' && (
              <p className="text-2xl text-green-400">
                {state.players.find(p => p.id === state.roundWinner)?.username || 'Player'} won the round!
              </p>
            )}
            {!state.roundWinner && <p className="text-2xl text-red-400">Nobody guessed it!</p>}
            <p className="text-xl mt-2">The word was: <span className="font-bold text-secondary">{state.lastRevealedWord}</span></p>
            <Button onClick={handleNextRound} className="mt-4 bg-primary hover:bg-primary-dark">
              Waiting for Next Round...
            </Button>
          </div>
        )}

        {state.gameStatus === 'matchOver' && (
          <div className="text-center mt-6">
            <h2 className="text-3xl font-bold mb-4">Match Over!</h2>
            {state.matchWinner === 'draw' && <p className="text-2xl text-yellow-400">It's a Draw!</p>}
            {state.matchWinner && state.matchWinner !== 'draw' && (
              <p className="text-2xl text-green-400">
                {state.players.find(p => p.id === state.matchWinner)?.username || 'Player'} won the match!
              </p>
            )}
             {!state.matchWinner && state.lastRevealedWord && <p className="text-2xl text-red-400">The match ended without a clear winner for the last round.</p>}
            <p className="text-xl mt-2">Final Scores:</p>
            {state.players.map(p => (
                <p key={p.id} className="text-lg">{p.username || `Player ${p.id.substring(0,6)}`}: {p.score}</p>
            ))}
            <Button onClick={handlePlayAgain} className="mt-6 bg-secondary hover:bg-secondary-dark">
              Play Again
            </Button>
          </div>
        )}
      </div>
      <div className="w-full max-w-2xl">
        <PlayerStatus />
      </div>
    </div>
  );
}