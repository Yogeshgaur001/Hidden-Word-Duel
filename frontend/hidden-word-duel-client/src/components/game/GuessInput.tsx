'use client';
import { useState, FormEvent } from 'react';
import { useGame } from '@/contexts/GameContext';
import Button from '@/components/ui/Button';

interface GuessInputProps {
  onSubmit: (guess: string) => void;
  disabled?: boolean;
}

export default function GuessInput({ onSubmit, disabled }: GuessInputProps) {
  const [guess, setGuess] = useState('');
  const { state } = useGame();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (guess.trim().length === state.wordLength && !disabled) {
      onSubmit(guess.trim().toUpperCase());
      setGuess('');
    } else if (guess.trim().length !== state.wordLength) {
        // Optional: show a small validation message
        alert(`Guess must be ${state.wordLength} letters long.`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value.toUpperCase())}
        maxLength={state.wordLength}
        placeholder={`Enter ${state.wordLength}-letter word`}
        disabled={disabled}
        className="p-3 border-2 border-gray-500 rounded-md bg-gray-700 text-lightText
                   focus:border-primary focus:ring-primary outline-none
                   w-full sm:w-auto flex-grow text-center sm:text-left text-lg
                   disabled:bg-gray-800 disabled:cursor-not-allowed"
        aria-label="Enter your guess"
      />
      <Button
        type="submit"
        disabled={disabled || guess.trim().length !== state.wordLength}
        className="w-full sm:w-auto px-6 py-3 bg-secondary hover:bg-green-500 disabled:bg-gray-600"
      >
        Guess
      </Button>
    </form>
  );
}