module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/contexts/GameContext.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GameProvider": (()=>GameProvider),
    "useGame": (()=>useGame)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
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
const GameContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
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
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(gameReducer, initialState);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GameContext.Provider, {
        value: {
            state,
            dispatch
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/GameContext.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
};
const useGame = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__4d132912._.js.map