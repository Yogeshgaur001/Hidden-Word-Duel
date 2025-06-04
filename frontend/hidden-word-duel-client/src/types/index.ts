export interface Player {
    id: string;
    username: string; // Or some identifier from server
    score: number;
  }
  
  export interface RevealedLetter {
    letter: string | null; // null if not yet revealed
    isRevealed: boolean;
  }
  
  export interface GameState {
    roundId: string | null;
    wordLength: number;
    revealedWord: RevealedLetter[]; // e.g. [{letter: 'A', isRevealed: true}, {letter: null, isRevealed: false}]
    players: Player[]; // Assuming player info comes with match/round start
    currentPlayerId: string | null; // ID of the client's player
    opponentPlayerId: string | null;
    currentRound: number;
    totalRounds: number; // e.g., best of 5
    timeLeftInTick: number; // For visual timer
    isTickActive: boolean;
    gameStatus: 'lobby' | 'waiting' | 'playing' | 'roundOver' | 'matchOver';
    roundWinner: string | null | 'draw'; // Player ID or 'draw'
    matchWinner: string | null | 'draw';
    lastRevealedWord: string | null; // The full word at the end of a round
    guessSubmittedThisTick: boolean;
    notification: { type: 'info' | 'error' | 'success'; message: string } | null;
  }
  
  // WebSocket Event Payloads (Client -> Server)
  export interface SubmitGuessPayload {
    roundId: string;
    guessText: string;
  }
  
  // WebSocket Event Payloads (Server -> Client)
  export interface StartRoundPayload {
    roundId: string;
    wordLength: number;
    roundNumber: number;
    // You'll need player info here or manage it separately
    player1: Player;
    player2: Player;
    currentPlayerId: string; // So client knows which player it is
  }
  
  export interface TickStartPayload {
    unrevealedTilePositions: number[]; // Not strictly needed if client tracks revealed state
    tickDuration: number; // e.g. 5000 (ms)
  }
  
  export interface RevealTilePayload {
    index: number;
    letter: string;
  }
  
  export interface RoundEndPayload {
    winner: string | null | 'draw'; // playerId or null for no winner, or 'draw'
    revealedWord: string; // The full word
    player1Score: number;
    player2Score: number;
  }
  
  export interface MatchEndPayload {
    winner: string | null | 'draw'; // playerId or null for tie, or 'draw'
    finalScores: { player1: number; player2: number };
  }
  
  export interface OpponentDisconnectedPayload {
    message: string;
  }