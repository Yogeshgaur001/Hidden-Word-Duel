// src/lib/socket.ts
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || 'http://localhost:3001';

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket && typeof window !== 'undefined') { // Ensure it runs only on client-side
    console.log('Initializing new socket connection to', SOCKET_SERVER_URL);
    socket = io(SOCKET_SERVER_URL, {
      // transports: ['websocket'], // Optional: force websocket transport
      // autoConnect: false, // If you want to connect manually
    });

    socket.on('connect_error', (err) => {
        console.error('Global Socket Connection Error:', err.message, err.cause);
    });

    socket.on('disconnect', (reason) => {
        console.log('Global Socket Disconnected:', reason);
        // Potentially set socket to null here if you want re-initialization on next getSocket call
        // This might be useful if a permanent disconnect happens and you want a fresh object.
        // However, socket.io usually handles reconnections automatically.
    });
  }
  if (!socket) {
    // This case might happen during SSR or if initialization failed.
    // Return a dummy socket or throw an error, depending on desired behavior.
    // For now, we'll log and it will likely lead to issues if called server-side.
    console.warn("Socket not initialized or called server-side. This might not work as expected.");
    // Fallback for SSR or if something went wrong, though this dummy won't be functional
    return {
        on: () => {},
        emit: () => {},
        disconnect: () => {},
        // ... add other methods you might call to avoid runtime errors
    } as unknown as Socket;
  }
  return socket;
};

// You might not need to export the `socket` instance directly if `getSocket` is used.
// export const socketInstance = getSocket(); // This would initialize on module load

// In useWebSocket.ts, you would then do:
// import { getSocket } from '@/lib/socket';
// ...
// useEffect(() => {
//   const currentSocket = getSocket();
//   if (!currentSocket.connected) {
//     currentSocket.connect(); // If autoConnect is false
//   }
//   socketRef.current = currentSocket;
//   // ... rest of the setup
// }, []);