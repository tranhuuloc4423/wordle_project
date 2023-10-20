import React from "react";
import Letter from "./Letter";
import { useSelector } from "react-redux";

function Board() {
    const board = useSelector((state) => state.board.board);
    return (
        <div className="board">
            {/* loop way */}
            {board.map((row, indexRow) => (
                <div key={indexRow} className="row">
                    {row.map((col, indexCol) => (
                        <Letter
                            key={indexCol}
                            letterPos={indexCol}
                            attemptVal={indexRow}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;
