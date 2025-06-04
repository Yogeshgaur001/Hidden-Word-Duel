'use client';
import { useGame } from '@/contexts/GameContext';

export default function Scoreboard() {
  const { state } = useGame();
  const { players, currentPlayerId, currentRound, totalRounds } = state;

  const player1 = players.find(p => p.id === currentPlayerId);
  const player2 = players.find(p => p.id !== currentPlayerId);


  return (
    <div className="w-full max-w-2xl bg-gray-800 p-4 rounded-lg shadow-lg flex justify-between items-center">
      <div className="text-center">
        <p className="text-sm text-gray-400">{player1?.username || 'You'}</p>
        <p className="text-3xl font-bold text-primary">{player1?.score || 0}</p>
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold">Round {currentRound} / {totalRounds}</p>
        <p className="text-xs text-gray-500">(Best of {totalRounds} or first to {Math.ceil(totalRounds/2)})</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-400">{player2?.username || 'Opponent'}</p>
        <p className="text-3xl font-bold text-secondary">{player2?.score || 0}</p>
      </div>
    </div>
  );
}