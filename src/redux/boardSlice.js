import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    board: [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ],
    position: 0,
    attempt: 0,
    correctWord: "RIGHT",
    listWord: null,
    gameOver: false,
    guessedWord: false,
    isInvalidWord: false,
};

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setBoard: (state, action) => {
            state.board = action.payload;
        },
        increasePos: (state) => {
            state.position++;
        },
        decreasePos: (state) => {
            state.position--;
        },
        increaseAttempt: (state) => {
            state.attempt++;
        },
        decreaseAttempt: (state) => {
            state.attempt--;
        },
        resetPosition: (state) => {
            state.position = 0;
        },
        resetAttempt: (state) => {
            state.attempt = 0;
        },
        setWord: (state, action) => {
            state.correctWord = action.payload;
        },
        setListWord: (state, action) => {
            state.listWord = action.payload;
        },
        setGameOver: (state, action) => {
            state.gameOver = action.payload;
        },
        setGuessedWord: (state, action) => {
            state.guessedWord = action.payload;
        },
        setisInvalidWord: (state, action) => {
            state.isInvalidWord = action.payload;
        },
    },
});

export const {
    setBoard,
    increasePos,
    decreasePos,
    increaseAttempt,
    decreaseAttempt,
    resetPosition,
    resetAttempt,
    setWord,
    setListWord,
    setGameOver,
    setGuessedWord,
    setisInvalidWord,
} = boardSlice.actions;

export default boardSlice.reducer;
