import React, {useState} from "react";
import { boardDefault } from "./Words";
import Letter from "./Letter";

function Board() {
    const [board, setBoard] = useState(boardDefault);
    return (
        <div className="Board">
            <div className="row"><Letter </div>
            <div className="row"></div>
            <div className="row"></div>
            <div className="row"></div>
            <div className="row"></div>
            <div className="row"></div>

        </div>
    );
}

export default Board;
