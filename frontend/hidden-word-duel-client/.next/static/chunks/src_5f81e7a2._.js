(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/contexts/GameContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "GameProvider": (()=>GameProvider),
    "useGame": (()=>useGame)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
const initialRevealedWord = (length)=>Array(length).fill(null).map(()=>({
            letter: null,
            isRevealed: false
        }));
const initialState = {
    roundId: null,
    wordLength: 0,
    revealedWord: [],
    players: [],
    currentPlayerId: null,
    opponentPlayerId: null,
    currentRound: 0,
    totalRounds: 5,
    timeLeftInTick: 0,
    isTickActive: false,
    gameStatus: 'lobby',
    roundWinner: null,
    matchWinner: null,
    lastRevealedWord: null,
    guessSubmittedThisTick: false,
    notification: null
};
const GameContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const gameReducer = (state, action)=>{
    switch(action.type){
        case 'CONNECTING':
            return {
                ...state,
                gameStatus: 'lobby',
                notification: {
                    type: 'info',
                    message: 'Connecting to server...'
                }
            };
        case 'CONNECTED_TO_LOBBY':
            return {
                ...state,
                gameStatus: 'lobby',
                notification: {
                    type: 'info',
                    message: 'Connected! Waiting for lobby...'
                }
            };
        case 'WAITING_FOR_OPPONENT':
            return {
                ...state,
                gameStatus: 'waiting',
                notification: {
                    type: 'info',
                    message: 'Waiting for an opponent...'
                }
            };
        case 'START_ROUND':
            {
                const { roundId, wordLength, roundNumber, player1, player2, currentPlayerId } = action.payload;
                // Determine who is the opponent
                const opponent = currentPlayerId === player1.id ? player2 : player1;
                return {
                    ...initialState,
                    gameStatus: 'playing',
                    roundId,
                    wordLength,
                    revealedWord: initialRevealedWord(wordLength),
                    currentRound: roundNumber,
                    players: [
                        player1,
                        player2
                    ],
                    currentPlayerId: currentPlayerId,
                    opponentPlayerId: opponent.id,
                    notification: {
                        type: 'info',
                        message: `Round ${roundNumber} starting! Guess the ${wordLength}-letter word.`
                    }
                };
            }
        case 'TICK_START':
            return {
                ...state,
                isTickActive: true,
                timeLeftInTick: action.payload.tickDuration / 1000,
                guessSubmittedThisTick: false,
                notification: {
                    type: 'info',
                    message: 'New tick! Make your guess.'
                }
            };
        case 'REVEAL_TILE':
            {
                const newRevealedWord = [
                    ...state.revealedWord
                ];
                newRevealedWord[action.payload.index] = {
                    letter: action.payload.letter,
                    isRevealed: true
                };
                return {
                    ...state,
                    revealedWord: newRevealedWord,
                    isTickActive: false
                };
            }
        case 'SUBMIT_GUESS_ATTEMPT':
            return {
                ...state,
                guessSubmittedThisTick: true
            };
        case 'GUESS_SUBMITTED':
            return {
                ...state,
                notification: {
                    type: 'info',
                    message: 'Guess submitted!'
                }
            };
        case 'ROUND_END':
            {
                const { winner, revealedWord, player1Score, player2Score } = action.payload;
                const updatedPlayers = state.players.map((p)=>p.id === state.players[0].id ? {
                        ...p,
                        score: player1Score
                    } : {
                        ...p,
                        score: player2Score
                    });
                let message = `Round over! The word was: ${revealedWord}. `;
                if (winner === 'draw') message += "It's a draw!";
                else if (winner) {
                    const winnerPlayer = updatedPlayers.find((p)=>p.id === winner);
                    message += `${winnerPlayer?.username || 'Player'} won the round!`;
                } else message += "No one guessed it right.";
                return {
                    ...state,
                    gameStatus: 'roundOver',
                    roundWinner: winner,
                    lastRevealedWord: revealedWord,
                    players: updatedPlayers,
                    isTickActive: false,
                    notification: {
                        type: 'success',
                        message
                    }
                };
            }
        case 'MATCH_END':
            {
                const { winner, finalScores } = action.payload;
                const updatedPlayers = state.players.map((p)=>p.id === state.players[0].id ? {
                        ...p,
                        score: finalScores.player1
                    } : {
                        ...p,
                        score: finalScores.player2
                    });
                let message = "Match Over! ";
                if (winner === 'draw') message += "It's a draw!";
                else if (winner) {
                    const winnerPlayer = updatedPlayers.find((p)=>p.id === winner);
                    message += `${winnerPlayer?.username || 'Player'} won the match!`;
                }
                return {
                    ...state,
                    gameStatus: 'matchOver',
                    matchWinner: winner,
                    players: updatedPlayers,
                    isTickActive: false,
                    notification: {
                        type: 'success',
                        message
                    }
                };
            }
        case 'UPDATE_TIMER':
            return {
                ...state,
                timeLeftInTick: action.payload
            };
        case 'SET_NOTIFICATION':
            return {
                ...state,
                notification: action.payload
            };
        case 'CLEAR_NOTIFICATION':
            return {
                ...state,
                notification: null
            };
        case 'OPPONENT_DISCONNECTED':
            return {
                ...state,
                gameStatus: 'matchOver',
                matchWinner: state.currentPlayerId,
                notification: {
                    type: 'error',
                    message: action.payload.message
                }
            };
        default:
            return state;
    }
};
const GameProvider = ({ children })=>{
    _s();
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(gameReducer, initialState);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GameContext.Provider, {
        value: {
            state,
            dispatch
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/GameContext.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
};
_s(GameProvider, "6JWkGZ32UPfojeNx+xqn8ZU8A0Q=");
_c = GameProvider;
const useGame = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
_s1(useGame, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "GameProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/hooks/useWebSocket.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useWebSocket": (()=>useWebSocket)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/GameContext.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
// Ensure this URL points to your NestJS backend WebSocket server
const SOCKET_SERVER_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SOCKET_SERVER_URL || 'http://localhost:3001'; // Use an env variable
const useWebSocket = ()=>{
    _s();
    const { dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWebSocket.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
            dispatch({
                type: 'CONNECTING'
            });
            const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])(SOCKET_SERVER_URL, {
            });
            socketRef.current = socket;
            socket.on('connect', {
                "useWebSocket.useEffect": ()=>{
                    console.log('Connected to WebSocket server:', socket.id);
                    dispatch({
                        type: 'CONNECTED_TO_LOBBY'
                    });
                // Client is ready, could emit a 'joinLobby' event if your backend requires it
                // For this spec, it seems two players connecting automatically starts things.
                }
            }["useWebSocket.useEffect"]);
            socket.on('connect_error', {
                "useWebSocket.useEffect": (err)=>{
                    console.error('Connection error:', err);
                    dispatch({
                        type: 'SET_NOTIFICATION',
                        payload: {
                            type: 'error',
                            message: `Connection Error: ${err.message}`
                        }
                    });
                }
            }["useWebSocket.useEffect"]);
            socket.on('waitingForOpponent', {
                "useWebSocket.useEffect": ()=>{
                    dispatch({
                        type: 'WAITING_FOR_OPPONENT'
                    });
                }
            }["useWebSocket.useEffect"]);
            socket.on('startRound', {
                "useWebSocket.useEffect": (data)=>{
                    console.log('startRound received:', data);
                    dispatch({
                        type: 'START_ROUND',
                        payload: data
                    });
                }
            }["useWebSocket.useEffect"]);
            socket.on('tickStart', {
                "useWebSocket.useEffect": (data)=>{
                    console.log('tickStart received:', data);
                    dispatch({
                        type: 'TICK_START',
                        payload: data
                    });
                }
            }["useWebSocket.useEffect"]);
            socket.on('revealTile', {
                "useWebSocket.useEffect": (data)=>{
                    console.log('revealTile received:', data);
                    dispatch({
                        type: 'REVEAL_TILE',
                        payload: data
                    });
                }
            }["useWebSocket.useEffect"]);
            socket.on('roundEnd', {
                "useWebSocket.useEffect": (data)=>{
                    console.log('roundEnd received:', data);
                    dispatch({
                        type: 'ROUND_END',
                        payload: data
                    });
                }
            }["useWebSocket.useEffect"]);
            socket.on('matchEnd', {
                "useWebSocket.useEffect": (data)=>{
                    console.log('matchEnd received:', data);
                    dispatch({
                        type: 'MATCH_END',
                        payload: data
                    });
                }
            }["useWebSocket.useEffect"]);
            socket.on('opponentDisconnected', {
                "useWebSocket.useEffect": (data)=>{
                    console.log('opponentDisconnected received:', data);
                    dispatch({
                        type: 'OPPONENT_DISCONNECTED',
                        payload: data
                    });
                }
            }["useWebSocket.useEffect"]);
            socket.on('error', {
                "useWebSocket.useEffect": (errorMsg)=>{
                    console.error('Server error:', errorMsg);
                    dispatch({
                        type: 'SET_NOTIFICATION',
                        payload: {
                            type: 'error',
                            message: errorMsg
                        }
                    });
                }
            }["useWebSocket.useEffect"]);
            socket.on('disconnect', {
                "useWebSocket.useEffect": (reason)=>{
                    console.log('Disconnected from WebSocket server:', reason);
                    dispatch({
                        type: 'SET_NOTIFICATION',
                        payload: {
                            type: 'error',
                            message: 'Disconnected from server.'
                        }
                    });
                }
            }["useWebSocket.useEffect"]);
            return ({
                "useWebSocket.useEffect": ()=>{
                    socket.disconnect();
                    socketRef.current = null;
                }
            })["useWebSocket.useEffect"];
        }
    }["useWebSocket.useEffect"], [
        dispatch
    ]);
    const submitGuess = (roundId, guessText)=>{
        if (socketRef.current && roundId) {
            socketRef.current.emit('submitGuess', {
                roundId,
                guessText
            });
            dispatch({
                type: 'SUBMIT_GUESS_ATTEMPT'
            }); // Optimistic UI update
        }
    };
    // Add other emit functions as needed, e.g., joinLobby, leaveGame
    return {
        submitGuess
    };
};
_s(useWebSocket, "ODr4Cif8oRViM8335WijJLiRVV0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/notificationBar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>NotificationBar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/GameContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function NotificationBar() {
    _s();
    const { state, dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    const { notification } = state;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NotificationBar.useEffect": ()=>{
            if (notification) {
                const timer = setTimeout({
                    "NotificationBar.useEffect.timer": ()=>{
                        dispatch({
                            type: 'CLEAR_NOTIFICATION'
                        });
                    }
                }["NotificationBar.useEffect.timer"], 5000); // Auto-clear after 5 seconds
                return ({
                    "NotificationBar.useEffect": ()=>clearTimeout(timer)
                })["NotificationBar.useEffect"];
            }
        }
    }["NotificationBar.useEffect"], [
        notification,
        dispatch
    ]);
    if (!notification) return null;
    const baseClasses = "fixed top-4 left-1/2 -translate-x-1/2 p-4 rounded-md shadow-lg text-white z-50 text-sm md:text-base";
    const typeClasses = {
        info: 'bg-blue-600',
        success: 'bg-green-600',
        error: 'bg-red-600'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${baseClasses} ${typeClasses[notification.type]}`,
        children: [
            notification.message,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>dispatch({
                        type: 'CLEAR_NOTIFICATION'
                    }),
                className: "ml-4 font-bold text-sm",
                "aria-label": "Close notification",
                children: "✕"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/notificationBar.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/notificationBar.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(NotificationBar, "SMlZY2uyVTClKrSyPFthlqGR0nA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"]
    ];
});
_c = NotificationBar;
var _c;
__turbopack_context__.k.register(_c, "NotificationBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>HomePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/GameContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useWebSocket.ts [app-client] (ecmascript)"); // Initialize WS connection here or in GamePage
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$notificationBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/notificationBar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client'; // Required for hooks
;
;
;
;
;
function HomePage() {
    _s();
    const { state } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Initialize WebSocket connection when component mounts or when game status is appropriate
    // The useWebSocket hook itself handles initialization on mount
    // We just call it here to make sure it's active.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWebSocket"])(); // This will trigger connection attempt
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            // If a round starts, navigate to the game page
            if (state.gameStatus === 'playing' || state.gameStatus === 'roundOver') {
                router.push('/game');
            }
        }
    }["HomePage.useEffect"], [
        state.gameStatus,
        router
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center text-center h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$notificationBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            state.gameStatus === 'lobby' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-semibold",
                        children: "Welcome to Hidden Word Duel!"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg",
                        children: "Connecting to the server..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-pulse",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 border-4 border-primary border-t-transparent rounded-full inline-block animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 35,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this),
            state.gameStatus === 'waiting' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-semibold",
                        children: "Waiting for an Opponent"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg",
                        children: "Hang tight, we're finding someone for you to duel!"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-pulse",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 border-4 border-secondary border-t-transparent rounded-full inline-block animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 44,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(HomePage, "y8c5Wn1VmDLSzrzTWRtLb1H3sW8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWebSocket"]
    ];
});
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_5f81e7a2._.js.map