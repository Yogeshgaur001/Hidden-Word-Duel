'use client';
import { useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';

export default function TimerDisplay() {
  const { state, dispatch } = useGame();
  const { timeLeftInTick, isTickActive } = state;

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (isTickActive && timeLeftInTick > 0) {
      timerId = setInterval(() => {
        dispatch({ type: 'UPDATE_TIMER', payload: Math.max(0, timeLeftInTick - 1) });
      }, 1000);
    } else if (timeLeftInTick === 0 && isTickActive) {
      // This client-side timer reaching zero doesn't mean the tick truly ended;
      // The server's `revealTile` or `roundEnd` event is the source of truth.
      // dispatch({ type: 'TICK_END' }); // We don't dispatch TICK_END, server controls this
    }
    return () => clearInterval(timerId);
  }, [timeLeftInTick, isTickActive, dispatch]);

  // Visual Timer Bar
  const initialDuration = state.isTickActive ? (state.timeLeftInTick / (state.players.length > 0 ? state.players[0].score : 5 /* default if no tick duration from server yet */ )) * 100 : 0;
  const progressPercentage = state.isTickActive ? (timeLeftInTick / (state.tickStartPayloadDuration / 1000 || 5)) * 100 : 0;


  return (
    <div className="my-4 text-center">
      {isTickActive ? (
        <>
          <p className="text-2xl font-semibold text-accent mb-2">
            Time left: <span className="tabular-nums">{timeLeftInTick}s</span>
          </p>
          <div className="w-full bg-gray-600 rounded-full h-2.5_ overflow-hidden">
            <div
              className="bg-accent h-2.5 rounded-full transition-all duration-1000 linear"
              style={{ width: `${progressPercentage}%` }}
              // If you use the animation defined in tailwind.config.js:
              // style={{ animationDuration: `${state.tickStartPayloadDuration}ms` }}
              // className={`bg-accent h-2.5 rounded-full ${isTickActive ? 'animate-tick' : ''}`}
            ></div>
          </div>
        </>
      ) : (
        <p className="text-xl text-gray-400">Waiting for next tick...</p>
      )}
    </div>
  );
}