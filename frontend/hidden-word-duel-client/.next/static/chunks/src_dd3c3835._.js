(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

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
"[project]/src/components/game/WordDisplay.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>WordDisplay)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/GameContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function WordDisplay() {
    _s();
    const { state } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    if (!state.revealedWord || state.revealedWord.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center space-x-2 my-8",
            children: Array(state.wordLength > 0 ? state.wordLength : 5).fill(0).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-12 h-16 md:w-16 md:h-20 bg-gray-700 rounded-md flex items-center justify-center text-3xl font-bold animate-pulse",
                    children: "_"
                }, i, false, {
                    fileName: "[project]/src/components/game/WordDisplay.tsx",
                    lineNumber: 11,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/game/WordDisplay.tsx",
            lineNumber: 9,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-center space-x-1 sm:space-x-2 my-8",
        "aria-label": "Current word",
        children: state.revealedWord.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-10 h-14 sm:w-12 sm:h-16 md:w-14 md:h-20
                      bg-gray-600 border-2 border-gray-500
                      rounded-md flex items-center justify-center
                      text-2xl sm:text-3xl md:text-4xl font-bold
                      transition-all duration-300 ease-in-out
                      ${item.isRevealed ? 'border-primary text-primary animate-reveal' : 'text-gray-400'}`,
                children: item.isRevealed ? item.letter : '_'
            }, index, false, {
                fileName: "[project]/src/components/game/WordDisplay.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/game/WordDisplay.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_s(WordDisplay, "bz/3tffehqHq3ZcuP6JOKCZwvko=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"]
    ];
});
_c = WordDisplay;
var _c;
__turbopack_context__.k.register(_c, "WordDisplay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/Button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Button = ({ children, className, variant = 'primary', ...props })=>{
    const baseStyle = "font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed";
    let variantStyle = '';
    switch(variant){
        case 'secondary':
            variantStyle = 'bg-secondary text-white hover:bg-green-500 focus:ring-green-400';
            break;
        case 'danger':
            variantStyle = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
            break;
        case 'primary':
        default:
            variantStyle = 'bg-primary text-white hover:bg-indigo-700 focus:ring-indigo-500';
            break;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: `${baseStyle} ${variantStyle} ${className}`,
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Button.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
};
_c = Button;
const __TURBOPACK__default__export__ = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/game/GuessInput.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>GuessInput)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/GameContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function GuessInput({ onSubmit, disabled }) {
    _s();
    const [guess, setGuess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const { state } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (guess.trim().length === state.wordLength && !disabled) {
            onSubmit(guess.trim().toUpperCase());
            setGuess('');
        } else if (guess.trim().length !== state.wordLength) {
            // Optional: show a small validation message
            alert(`Guess must be ${state.wordLength} letters long.`);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "flex flex-col sm:flex-row items-center justify-center gap-3 mt-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                value: guess,
                onChange: (e)=>setGuess(e.target.value.toUpperCase()),
                maxLength: state.wordLength,
                placeholder: `Enter ${state.wordLength}-letter word`,
                disabled: disabled,
                className: "p-3 border-2 border-gray-500 rounded-md bg-gray-700 text-lightText   focus:border-primary focus:ring-primary outline-none   w-full sm:w-auto flex-grow text-center sm:text-left text-lg   disabled:bg-gray-800 disabled:cursor-not-allowed",
                "aria-label": "Enter your guess"
            }, void 0, false, {
                fileName: "[project]/src/components/game/GuessInput.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                type: "submit",
                disabled: disabled || guess.trim().length !== state.wordLength,
                className: "w-full sm:w-auto px-6 py-3 bg-secondary hover:bg-green-500 disabled:bg-gray-600",
                children: "Guess"
            }, void 0, false, {
                fileName: "[project]/src/components/game/GuessInput.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game/GuessInput.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s(GuessInput, "qLraePjrhIP3BQAxJhaXR/ck+X4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"]
    ];
});
_c = GuessInput;
var _c;
__turbopack_context__.k.register(_c, "GuessInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/game/TimerDisplay.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TimerDisplay)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/GameContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function TimerDisplay() {
    _s();
    const { state, dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    const { timeLeftInTick, isTickActive } = state;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TimerDisplay.useEffect": ()=>{
            let timerId;
            if (isTickActive && timeLeftInTick > 0) {
                timerId = setInterval({
                    "TimerDisplay.useEffect": ()=>{
                        dispatch({
                            type: 'UPDATE_TIMER',
                            payload: Math.max(0, timeLeftInTick - 1)
                        });
                    }
                }["TimerDisplay.useEffect"], 1000);
            } else if (timeLeftInTick === 0 && isTickActive) {
            // This client-side timer reaching zero doesn't mean the tick truly ended;
            // The server's `revealTile` or `roundEnd` event is the source of truth.
            // dispatch({ type: 'TICK_END' }); // We don't dispatch TICK_END, server controls this
            }
            return ({
                "TimerDisplay.useEffect": ()=>clearInterval(timerId)
            })["TimerDisplay.useEffect"];
        }
    }["TimerDisplay.useEffect"], [
        timeLeftInTick,
        isTickActive,
        dispatch
    ]);
    // Visual Timer Bar
    const initialDuration = state.isTickActive ? state.timeLeftInTick / (state.players.length > 0 ? state.players[0].score : 5 /* default if no tick duration from server yet */ ) * 100 : 0;
    const progressPercentage = state.isTickActive ? timeLeftInTick / (state.tickStartPayloadDuration / 1000 || 5) * 100 : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "my-4 text-center",
        children: isTickActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-2xl font-semibold text-accent mb-2",
                    children: [
                        "Time left: ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "tabular-nums",
                            children: [
                                timeLeftInTick,
                                "s"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/game/TimerDisplay.tsx",
                            lineNumber: 33,
                            columnNumber: 24
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/game/TimerDisplay.tsx",
                    lineNumber: 32,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full bg-gray-600 rounded-full h-2.5_ overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-accent h-2.5 rounded-full transition-all duration-1000 linear",
                        style: {
                            width: `${progressPercentage}%`
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/TimerDisplay.tsx",
                        lineNumber: 36,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/game/TimerDisplay.tsx",
                    lineNumber: 35,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xl text-gray-400",
            children: "Waiting for next tick..."
        }, void 0, false, {
            fileName: "[project]/src/components/game/TimerDisplay.tsx",
            lineNumber: 46,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/game/TimerDisplay.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(TimerDisplay, "SMlZY2uyVTClKrSyPFthlqGR0nA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"]
    ];
});
_c = TimerDisplay;
var _c;
__turbopack_context__.k.register(_c, "TimerDisplay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/game/Scoreboard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Scoreboard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/GameContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function Scoreboard() {
    _s();
    const { state } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    const { players, currentPlayerId, currentRound, totalRounds } = state;
    const player1 = players.find((p)=>p.id === currentPlayerId);
    const player2 = players.find((p)=>p.id !== currentPlayerId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-2xl bg-gray-800 p-4 rounded-lg shadow-lg flex justify-between items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-400",
                        children: player1?.username || 'You'
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/Scoreboard.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-3xl font-bold text-primary",
                        children: player1?.score || 0
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/Scoreboard.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/Scoreboard.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg font-semibold",
                        children: [
                            "Round ",
                            currentRound,
                            " / ",
                            totalRounds
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/Scoreboard.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500",
                        children: [
                            "(Best of ",
                            totalRounds,
                            " or first to ",
                            Math.ceil(totalRounds / 2),
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/Scoreboard.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/Scoreboard.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-400",
                        children: player2?.username || 'Opponent'
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/Scoreboard.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-3xl font-bold text-secondary",
                        children: player2?.score || 0
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/Scoreboard.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game/Scoreboard.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game/Scoreboard.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_s(Scoreboard, "bz/3tffehqHq3ZcuP6JOKCZwvko=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"]
    ];
});
_c = Scoreboard;
var _c;
__turbopack_context__.k.register(_c, "Scoreboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/game/PlayerStatus.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PlayerStatus)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/GameContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function PlayerStatus() {
    _s();
    const { state } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    const { players, currentPlayerId, isTickActive, guessSubmittedThisTick } = state;
    const getPlayerStatusText = (playerId)=>{
        if (!playerId) return "Waiting...";
        if (!isTickActive) return "Waiting for tick...";
        if (playerId === currentPlayerId && guessSubmittedThisTick) return "Guess submitted!";
        if (playerId !== currentPlayerId && state.opponentGuessStatus) return state.opponentGuessStatus; // if server sends this
        return "Thinking...";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-center",
        children: players.map((player)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `p-4 rounded-lg ${player.id === currentPlayerId ? 'bg-blue-900' : 'bg-purple-900'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold text-lg",
                        children: [
                            player.username || `Player ${player.id.substring(0, 5)}`,
                            " ",
                            player.id === currentPlayerId ? "(You)" : "(Opponent)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game/PlayerStatus.tsx",
                        lineNumber: 21,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-300",
                        children: getPlayerStatusText(player.id)
                    }, void 0, false, {
                        fileName: "[project]/src/components/game/PlayerStatus.tsx",
                        lineNumber: 22,
                        columnNumber: 21
                    }, this)
                ]
            }, player.id, true, {
                fileName: "[project]/src/components/game/PlayerStatus.tsx",
                lineNumber: 20,
                columnNumber: 17
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/game/PlayerStatus.tsx",
        lineNumber: 18,
        columnNumber: 9
    }, this);
}
_s(PlayerStatus, "bz/3tffehqHq3ZcuP6JOKCZwvko=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"]
    ];
});
_c = PlayerStatus;
var _c;
__turbopack_context__.k.register(_c, "PlayerStatus");
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
"[project]/src/app/game/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>GamePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/GameContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useWebSocket.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$WordDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/game/WordDisplay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$GuessInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/game/GuessInput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$TimerDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/game/TimerDisplay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$Scoreboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/game/Scoreboard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$PlayerStatus$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/game/PlayerStatus.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$notificationBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/notificationBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-client] (ecmascript)"); // Assuming you have a generic button
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
function GamePage() {
    _s();
    const { state, dispatch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"])();
    const { submitGuess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWebSocket"])(); // Get submitGuess function
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GamePage.useEffect": ()=>{
            // If not in a game state, redirect to lobby (e.g., on refresh or direct access)
            if (state.gameStatus === 'lobby' && !state.roundId) {
            // router.push('/'); // Or handle re-joining logic if possible
            }
        }
    }["GamePage.useEffect"], [
        state.gameStatus,
        state.roundId,
        router
    ]);
    const handleNextRound = ()=>{
        // This might be triggered by server or a client action if needed
        // For now, assume server sends `startRound` automatically
        dispatch({
            type: 'SET_NOTIFICATION',
            payload: {
                type: 'info',
                message: 'Waiting for next round...'
            }
        });
    };
    const handlePlayAgain = ()=>{
        // This would ideally involve telling the server the player wants to play again
        // For simplicity, we might just reset to lobby state and wait for server to pair again
        // socketRef.current?.emit('requestNewMatch'); // Example
        dispatch({
            type: 'CONNECTING'
        }); // Reset state
        router.push('/');
    };
    if (state.gameStatus === 'lobby' || !state.roundId && state.gameStatus !== 'matchOver') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center text-center h-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$notificationBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/app/game/page.tsx",
                    lineNumber: 46,
                    columnNumber: 10
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xl",
                    children: "Loading game or returning to lobby..."
                }, void 0, false, {
                    fileName: "[project]/src/app/game/page.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-pulse mt-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-12 h-12 border-4 border-primary border-t-transparent rounded-full inline-block animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/src/app/game/page.tsx",
                        lineNumber: 49,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/game/page.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/game/page.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center space-y-6 p-4 md:p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$notificationBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/game/page.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$Scoreboard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/game/page.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-xl",
                children: [
                    state.gameStatus === 'playing' || state.gameStatus === 'roundOver' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$TimerDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$WordDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 64,
                                columnNumber: 13
                            }, this),
                            state.gameStatus === 'playing' && state.isTickActive && !state.guessSubmittedThisTick && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$GuessInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onSubmit: (guess)=>state.roundId && submitGuess(state.roundId, guess),
                                disabled: !state.isTickActive || state.guessSubmittedThisTick
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 66,
                                columnNumber: 15
                            }, this),
                            state.gameStatus === 'playing' && state.isTickActive && state.guessSubmittedThisTick && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-center text-accent mt-4",
                                children: "Guess submitted! Waiting for tick to end..."
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 72,
                                columnNumber: 17
                            }, this),
                            state.gameStatus === 'playing' && !state.isTickActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-center text-gray-400 mt-4",
                                children: "Waiting for next letter reveal..."
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 75,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true) : null,
                    state.gameStatus === 'roundOver' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mt-6",
                        children: [
                            state.roundWinner === 'draw' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl text-yellow-400",
                                children: "Round Draw!"
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 82,
                                columnNumber: 46
                            }, this),
                            state.roundWinner && state.roundWinner !== 'draw' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl text-green-400",
                                children: [
                                    state.players.find((p)=>p.id === state.roundWinner)?.username || 'Player',
                                    " won the round!"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, this),
                            !state.roundWinner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl text-red-400",
                                children: "Nobody guessed it!"
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 88,
                                columnNumber: 36
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl mt-2",
                                children: [
                                    "The word was: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-secondary",
                                        children: state.lastRevealedWord
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/game/page.tsx",
                                        lineNumber: 89,
                                        columnNumber: 55
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onClick: handleNextRound,
                                className: "mt-4 bg-primary hover:bg-primary-dark",
                                children: "Waiting for Next Round..."
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/game/page.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this),
                    state.gameStatus === 'matchOver' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mt-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl font-bold mb-4",
                                children: "Match Over!"
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this),
                            state.matchWinner === 'draw' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl text-yellow-400",
                                children: "It's a Draw!"
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 99,
                                columnNumber: 46
                            }, this),
                            state.matchWinner && state.matchWinner !== 'draw' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl text-green-400",
                                children: [
                                    state.players.find((p)=>p.id === state.matchWinner)?.username || 'Player',
                                    " won the match!"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 101,
                                columnNumber: 15
                            }, this),
                            !state.matchWinner && state.lastRevealedWord && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl text-red-400",
                                children: "The match ended without a clear winner for the last round."
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 105,
                                columnNumber: 63
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl mt-2",
                                children: "Final Scores:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this),
                            state.players.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg",
                                    children: [
                                        p.username || `Player ${p.id.substring(0, 6)}`,
                                        ": ",
                                        p.score
                                    ]
                                }, p.id, true, {
                                    fileName: "[project]/src/app/game/page.tsx",
                                    lineNumber: 108,
                                    columnNumber: 17
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onClick: handlePlayAgain,
                                className: "mt-6 bg-secondary hover:bg-secondary-dark",
                                children: "Play Again"
                            }, void 0, false, {
                                fileName: "[project]/src/app/game/page.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/game/page.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/game/page.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-2xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2f$PlayerStatus$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/app/game/page.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/game/page.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/game/page.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(GamePage, "L8sbjTAduENmQco99wDGw/+i/54=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGame"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWebSocket"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = GamePage;
var _c;
__turbopack_context__.k.register(_c, "GamePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_dd3c3835._.js.map