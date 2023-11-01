import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setisInvalidWord } from "../redux/boardSlice";

const Message = ({ title, correctWord }) => {
    const dispatch = useDispatch();
    const gameover = useSelector((state) => state.board.gameOver);
    const [close, setClose] = useState(true);
    const handleSubmit = () => {
        setClose(false);
        dispatch(setisInvalidWord(false));
        if (gameover) {
            window.location.reload();
        }
    };

    const handleKeyboard = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };
    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);
        return () => document.removeEventListener("keydown", handleKeyboard);
    }, [handleKeyboard]);
    return (
        <>
            {close && (
                <div className="message" onKeyDown={handleKeyboard}>
                    <span className="btn-close" onClick={handleSubmit}>
                        &times;
                    </span>
                    <div className="message-title">{title}</div>
                    <div className="message-content">
                        The correct word is{" "}
                        <span className="correct-word">{correctWord}</span>
                    </div>
                    <div className="message-content">
                        Would you like to try again ?
                    </div>
                    <button className="btn-submit" onClick={handleSubmit}>
                        OK
                    </button>
                </div>
            )}
        </>
    );
};

export default Message;
