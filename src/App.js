import React from "react";
import Board from "./component/Board";
import Keyboard from "./component/Keyboard";
import "./App.css";
import { createContext , useState} from "react";
import { boardDefault } from "./Words"


export const AppContext = createContext();
function App() {
    const [board, setBoard] = useState(boardDefault);

    return (
        <div className="App">
            <nav>
                <h1>Wordle</h1>
            </nav>
            <AppContext.Provider value={{board, setBoard}}>
                <div className="game">
                    <Board/>
                    <Keyboard/>
                </div>
            </AppContext.Provider>

        </div>
    )
}

export default App;
