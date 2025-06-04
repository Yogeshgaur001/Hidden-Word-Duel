// src/lib/utils.ts

/**
 * Simple function to create an array of a given length,
 * useful for rendering placeholders.
 */
export const createRange = (length: number): number[] => {
    return Array.from({ length }, (_, i) => i);
  };
  
  /**
   * Formats a duration in milliseconds to a more readable string, e.g., "5s".
   * (Not strictly needed for the timer display as it's already in seconds, but an example)
   */
  export const formatDuration = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };
  
  /**
   * A simple debounce function.
   */
  export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout | null = null;
    return function(this: any, ...args: Parameters<T>) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  
  // Add other utility functions as needed
  // e.g., for string manipulation, date formatting, etc.