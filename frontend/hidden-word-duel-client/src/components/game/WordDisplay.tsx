'use client';
import { useGame } from '@/contexts/GameContext';

export default function WordDisplay() {
  const { state } = useGame();

  if (!state.revealedWord || state.revealedWord.length === 0) {
    return (
      <div className="flex justify-center space-x-2 my-8">
        {Array(state.wordLength > 0 ? state.wordLength : 5).fill(0).map((_, i) => (
          <div
            key={i}
            className="w-12 h-16 md:w-16 md:h-20 bg-gray-700 rounded-md flex items-center justify-center text-3xl font-bold animate-pulse"
          >
            _
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center space-x-1 sm:space-x-2 my-8" aria-label="Current word">
      {state.revealedWord.map((item, index) => (
        <div
          key={index}
          className={`w-10 h-14 sm:w-12 sm:h-16 md:w-14 md:h-20
                      bg-gray-600 border-2 border-gray-500
                      rounded-md flex items-center justify-center
                      text-2xl sm:text-3xl md:text-4xl font-bold
                      transition-all duration-300 ease-in-out
                      ${item.isRevealed ? 'border-primary text-primary animate-reveal' : 'text-gray-400'}`}
        >
          {item.isRevealed ? item.letter : '_'}
        </div>
      ))}
    </div>
  );
}