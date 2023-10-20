import React, { useState } from "react";
import {
    increasePos,
    setBoard,
    decreasePos,
    resetPosition,
    increaseAttempt,
    setGameOver,
    setGuessedWord,
    setisInvalidWord,
} from "../redux/boardSlice";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Key from "./Key";
import Message from "./Message";
function Keyboard() {
    const board = useSelector((state) => state.board.board);
    const position = useSelector((state) => state.board.position);
    const attempt = useSelector((state) => state.board.attempt);
    const correctWord = useSelector((state) => state.board.correctWord);
    const listWord = useSelector((state) => state.board.listWord);
    const isInvalidWord = useSelector((state) => state.board.isInvalidWord);
    const wordLength = 5;
    const dispatch = useDispatch();
    const keyboard = [
        "Q W E R T Y U I O P",
        "A S D F G H J K L",
        "Z X C V B N M",
    ];

    const onSelectLetter = (value) => {
        if (position > 4) return;
        const newBoard = [...board]; // Tạo bản sao mới của board
        newBoard[attempt] = [...newBoard[attempt]]; // Tạo bản sao mới của mảng con bên trong
        newBoard[attempt][position] = value;
        dispatch(setBoard(newBoard));
        dispatch(increasePos());
    };

    const onDelete = () => {
        if (position === 0) return;
        const newBoard = [...board];
        newBoard[attempt] = [...newBoard[attempt]];
        newBoard[attempt][position - 1] = "";
        dispatch(decreasePos());
        dispatch(setBoard(newBoard));
    };

    const onEnter = () => {
        if (position !== wordLength) return;
        let currWord = "";
        for (let i = 0; i < wordLength; i++) {
            currWord += board[attempt][i];
        }
        if (listWord.includes(currWord.toLowerCase())) {
            console.log("valid word");
            dispatch(increaseAttempt());
            dispatch(resetPosition());
        } else {
            dispatch(setisInvalidWord(true));
            const newBoard = [...board];
            newBoard[attempt] = [...newBoard[attempt]];
            for (let i = 0; i < wordLength; i++) {
                newBoard[attempt][i] = "";
            }
            dispatch(setBoard(newBoard));
            dispatch(resetPosition());
        }

        if (currWord === correctWord) {
            dispatch(setGameOver(true));
            dispatch(setGuessedWord(true));
        } else if (attempt === 5) {
            dispatch(setGameOver(true));
            dispatch(setGuessedWord(false));
        }
    };

    const handleKeyboard = useCallback((e) => {
        const { key } = e;
        if (/^[A-Za-z]$/.test(key)) {
            const uppercaseKey = key.toUpperCase();
            onSelectLetter(uppercaseKey);
        } else if (key === "Enter") {
            onEnter();
        } else if (key === "Backspace") {
            onDelete();
        }
    });
    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);
        return () => document.removeEventListener("keydown", handleKeyboard);
    }, [handleKeyboard]);

    return (
        <>
            <div className="keyboard" onKeyDown={handleKeyboard}>
                {keyboard.map((line, indexLine) => {
                    if (indexLine == 2) {
                        return (
                            <div key={indexLine} className="line">
                                <Key
                                    keyVal={"ENTER"}
                                    bigKey
                                    onClickFunc={onEnter}
                                />
                                {line.split(" ").map((key, indexKey) => {
                                    return (
                                        <Key
                                            keyVal={key}
                                            key={indexKey}
                                            onClickFunc={() =>
                                                onSelectLetter(key)
                                            }
                                        />
                                    );
                                })}
                                <Key
                                    keyVal={"DELETE"}
                                    bigKey
                                    onClickFunc={onDelete}
                                />
                            </div>
                        );
                    } else {
                        return (
                            <div key={indexLine} className="line">
                                {line.split(" ").map((key, indexKey) => {
                                    return (
                                        <Key
                                            keyVal={key}
                                            key={indexKey}
                                            onClickFunc={() =>
                                                onSelectLetter(key)
                                            }
                                        />
                                    );
                                })}
                            </div>
                        );
                    }
                })}
            </div>
            {isInvalidWord && <Message title={`Word not found`} />}
        </>
    );
}

export default Keyboard;
