'use client';
import { useGame } from '@/contexts/GameContext';

// Basic example - can be made much more creative
export default function PlayerStatus() {
    const { state } = useGame();
    const { players, currentPlayerId, isTickActive, guessSubmittedThisTick } = state;

    const getPlayerStatusText = (playerId: string | null | undefined) => {
        if (!playerId) return "Waiting...";
        if (!isTickActive) return "Waiting for tick...";
        if (playerId === currentPlayerId && guessSubmittedThisTick) return "Guess submitted!";
        if (playerId !== currentPlayerId && state.opponentGuessStatus) return state.opponentGuessStatus; // if server sends this
        return "Thinking...";
    };

    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            {players.map(player => (
                <div key={player.id} className={`p-4 rounded-lg ${player.id === currentPlayerId ? 'bg-blue-900' : 'bg-purple-900'}`}>
                    <h3 className="font-semibold text-lg">{player.username || `Player ${player.id.substring(0,5)}`} {player.id === currentPlayerId ? "(You)" : "(Opponent)"}</h3>
                    <p className="text-sm text-gray-300">
                        {getPlayerStatusText(player.id)}
                    </p>
                </div>
            ))}
        </div>
    );
}