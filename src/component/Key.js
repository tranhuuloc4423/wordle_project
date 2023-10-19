import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    increasePos,
    setBoard,
    decreasePos,
    resetPosition,
    increaseAttempt,
} from "../redux/boardSlice";

function Key({ keyVal, bigKey }) {
    const dispatch = useDispatch();
    const board = useSelector((state) => state.board.board);
    const position = useSelector((state) => state.board.position);
    const attempt = useSelector((state) => state.board.attempt);
    const correctWord = useSelector((state) => state.board.correctWord);

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

    // const onEnter = () => {
    //     console.log(correctWord)
    //     if (posX !== 5) return
    //     let currWord = ''
    //     for (let i = 0; i < 5; i++) {
    //         currWord += board[posY][i]
    //     }

    //     if (wordList.has(currWord.toLowerCase())) {
    //         setPos({ posY: posY + 1, posX: 0 })
    //     } else {
    //         alert('Word Not Found')
    //     }

    //     if (currWord === correctWord) {
    //         setGameOver({ gameOver: true, guessedWord: true })
    //         return
    //     }
    //     if (posY === 5) {
    //         setGameOver({ gameOver: true, guessedWord: false })
    //     }
    // }

    const onEnter = () => {
        if (position !== 5) return;
        dispatch(increaseAttempt());
        dispatch(resetPosition());
    };

    const selectLetter = () => {
        if (keyVal === "ENTER") {
            onEnter();
        } else if (keyVal === "DELETE") {
            onDelete();
        } else {
            onSelectLetter(keyVal);
        }
    };

    const handleKeyboard = (event) => {
        const { key } = event;
        if (/^[A-Za-z]$/.test(key)) {
            const uppercaseKey = key.toUpperCase();
            onSelectLetter(uppercaseKey);
        } else if (event.key === "Enter") {
            onEnter();
        } else if (event.key === "Backspace") {
            onDelete();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);
        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        };
    }, [handleKeyboard]);

    return (
        <div
            className="key"
            id={bigKey && "big"}
            onClick={() => selectLetter(keyVal)}
        >
            {keyVal}
        </div>
    );
}

export default Key;
