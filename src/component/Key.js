import React from "react";

function Key({ keyVal, bigKey, onClickFunc }) {
    return (
        <div
            className={`key ${bigKey ? "big" : undefined}`}
            onClick={onClickFunc}
        >
            {keyVal}
        </div>
    );
}

export default Key;
