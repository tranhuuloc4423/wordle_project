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
} = boardSlice.actions;

export default boardSlice.reducer;
