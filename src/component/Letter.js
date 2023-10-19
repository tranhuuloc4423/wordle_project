import React, { useContext } from "react";
import { AppContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

function Letter({ letterPos, attemptVal }) {
    const dispatch = useDispatch();
    const board = useSelector((state) => state.board.board);
    const position = useSelector((state) => state.board.position);
    const attempt = useSelector((state) => state.board.attempt);
    const correctWord = useSelector((state) => state.board.correctWord);

    const variants = {
        filled: () => ({
            scale: [1.2, 1],
            transition: {
                duration: 0.2,
            },
        }),
        unfilled: () => ({
            scale: [1.2, 1],
            transition: {
                duration: 0.2,
            },
        }),
    };

    const letter = board[attemptVal][letterPos];

    const correct = correctWord[letterPos] === letter;

    const almost = !correct && letter !== "" && correctWord.includes(letter);
    const letterState =
        attempt > attemptVal &&
        (correct ? "correct" : almost ? "almost" : "error");
    return (
        <motion.div
            animate={letter ? "filled" : "unfilled"}
            variants={variants}
        >
            <div className="letter" id={letterState}>
                {""}
                {letter}
            </div>
        </motion.div>
    );
}

export default Letter;
