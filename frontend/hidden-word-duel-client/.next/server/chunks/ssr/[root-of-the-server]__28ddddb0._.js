module.exports = {

"[next]/internal/font/google/inter_59dee874.module.css [app-rsc] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "className": "inter_59dee874-module__9CtR0q__className",
});
}}),
"[next]/internal/font/google/inter_59dee874.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_59dee874$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_59dee874.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_59dee874$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Inter', 'Inter Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_59dee874$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_59dee874$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}}),
"[project]/src/contexts/GameContext.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GameProvider": (()=>GameProvider),
    "useGame": (()=>useGame)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
;
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
const GameContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createContext"])(undefined);
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
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useReducer"])(gameReducer, initialState);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(GameContext.Provider, {
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
const useGame = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useContext"])(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>RootLayout),
    "metadata": (()=>metadata)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_59dee874$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/inter_59dee874.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/GameContext.tsx [app-rsc] (ecmascript)"); // Import GameProvider
;
;
;
;
const metadata = {
    title: 'Hidden Word Duel',
    description: 'Real-time multiplayer word guessing game.'
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "en",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$inter_59dee874$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].className} bg-darkBg text-lightText min-h-screen flex flex-col`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$GameContext$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GameProvider"], {
                children: [
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "p-4 bg-gray-800 shadow-md",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold text-center text-primary",
                            children: "Hidden Word Duel"
                        }, void 0, false, {
                            fileName: "[project]/src/app/layout.tsx",
                            lineNumber: 23,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-grow container mx-auto p-4",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "p-4 bg-gray-800 text-center text-sm text-gray-400",
                        children: "Wisflux Full Stack App Assignment"
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.tsx",
                        lineNumber: 28,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/layout.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/layout.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/layout.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__28ddddb0._.js.map