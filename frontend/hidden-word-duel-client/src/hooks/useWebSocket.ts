import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useGame } from '@/contexts/GameContext';
import { StartRoundPayload, TickStartPayload, RevealTilePayload, RoundEndPayload, MatchEndPayload, OpponentDisconnectedPayload } from '@/types';

// Ensure this URL points to your NestJS backend WebSocket server
const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || 'http://localhost:3001'; // Use an env variable

export const useWebSocket = () => {
  const { dispatch } = useGame();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!SOCKET_SERVER_URL) {
      console.error("Socket server URL is not defined!");
      dispatch({ type: 'SET_NOTIFICATION', payload: { type: 'error', message: 'Server configuration error.' }});
      return;
    }

    dispatch({ type: 'CONNECTING' });
    const socket = io(SOCKET_SERVER_URL, {
      // Add any necessary options, e.g., for authentication if you implement it
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to WebSocket server:', socket.id);
      dispatch({ type: 'CONNECTED_TO_LOBBY' });
      // Client is ready, could emit a 'joinLobby' event if your backend requires it
      // For this spec, it seems two players connecting automatically starts things.
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
      dispatch({ type: 'SET_NOTIFICATION', payload: { type: 'error', message: `Connection Error: ${err.message}` } });
    });

    socket.on('waitingForOpponent', () => {
        dispatch({ type: 'WAITING_FOR_OPPONENT' });
    });

    socket.on('startRound', (data: StartRoundPayload) => {
      console.log('startRound received:', data);
      dispatch({ type: 'START_ROUND', payload: data });
    });

    socket.on('tickStart', (data: TickStartPayload) => {
      console.log('tickStart received:', data);
      dispatch({ type: 'TICK_START', payload: data });
    });

    socket.on('revealTile', (data: RevealTilePayload) => {
      console.log('revealTile received:', data);
      dispatch({ type: 'REVEAL_TILE', payload: data });
    });

    socket.on('roundEnd', (data: RoundEndPayload) => {
      console.log('roundEnd received:', data);
      dispatch({ type: 'ROUND_END', payload: data });
    });

    socket.on('matchEnd', (data: MatchEndPayload) => {
      console.log('matchEnd received:', data);
      dispatch({ type: 'MATCH_END', payload: data });
    });

    socket.on('opponentDisconnected', (data: OpponentDisconnectedPayload) => {
        console.log('opponentDisconnected received:', data);
        dispatch({ type: 'OPPONENT_DISCONNECTED', payload: data });
    });

    socket.on('error', (errorMsg: string) => {
        console.error('Server error:', errorMsg);
        dispatch({ type: 'SET_NOTIFICATION', payload: { type: 'error', message: errorMsg }});
    });


    socket.on('disconnect', (reason) => {
      console.log('Disconnected from WebSocket server:', reason);
      dispatch({ type: 'SET_NOTIFICATION', payload: { type: 'error', message: 'Disconnected from server.' } });
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [dispatch]);

  const submitGuess = (roundId: string, guessText: string) => {
    if (socketRef.current && roundId) {
      socketRef.current.emit('submitGuess', { roundId, guessText });
      dispatch({ type: 'SUBMIT_GUESS_ATTEMPT' }); // Optimistic UI update
    }
  };

  // Add other emit functions as needed, e.g., joinLobby, leaveGame

  return { submitGuess };
};