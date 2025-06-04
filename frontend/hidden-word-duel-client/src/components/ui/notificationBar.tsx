'use client';
import { useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';

export default function NotificationBar() {
  const { state, dispatch } = useGame();
  const { notification } = state;

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000); // Auto-clear after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!notification) return null;

  const baseClasses = "fixed top-4 left-1/2 -translate-x-1/2 p-4 rounded-md shadow-lg text-white z-50 text-sm md:text-base";
  const typeClasses = {
    info: 'bg-blue-600',
    success: 'bg-green-600',
    error: 'bg-red-600',
  };

  return (
    <div className={`${baseClasses} ${typeClasses[notification.type]}`}>
      {notification.message}
      <button
        onClick={() => dispatch({ type: 'CLEAR_NOTIFICATION' })}
        className="ml-4 font-bold text-sm"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}