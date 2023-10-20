import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setisInvalidWord } from "../redux/boardSlice";

const Message = ({ title, content }) => {
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
    return (
        <>
            {close && (
                <div className="message">
                    <span className="btn-close" onClick={handleSubmit}>
                        &times;
                    </span>
                    <div className="message-title">{title}</div>
                    <div className="message-content">{content}</div>
                    <button className="btn-submit" onClick={handleSubmit}>
                        OK
                    </button>
                </div>
            )}
        </>
    );
};

export default Message;
