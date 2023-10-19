import React from "react";

import Key from "./Key";
function Keyboard() {
    // const { onDelete, onEnter, onSelectLetter } = useContext(AppContext);
    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];
    const keyboard = [
        "Q W E R T Y U I O P",
        "A S D F G H J K L",
        "Z X C V B N M",
    ];

    return (
        <div className="keyboard">
            {keyboard.map((line, indexLine) => {
                if (indexLine == 2) {
                    return (
                        <>
                            <div key={indexLine} className="line">
                                <Key keyVal={"ENTER"} bigKey />
                                {line.split(" ").map((key, indexKey) => {
                                    return <Key keyVal={key} key={indexKey} />;
                                })}
                                <Key keyVal={"DELETE"} bigKey />
                            </div>
                        </>
                    );
                } else {
                    return (
                        <div key={indexLine} className="line">
                            {line.split(" ").map((key, indexKey) => {
                                return <Key keyVal={key} key={indexKey} />;
                            })}
                        </div>
                    );
                }
            })}
        </div>
    );
}

export default Keyboard;
