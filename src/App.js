import React, { useEffect } from "react";
import Board from "./component/Board";
import Keyboard from "./component/Keyboard";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { setListWord, setWord } from "./redux/boardSlice";
import wordbank from "./wordle-bank.txt";
import Message from "./component/Message";
function App() {
    const dispatch = useDispatch();
    // const url = " https://api.datamuse.com/words?sp=?????&max=1000";
    const gameover = useSelector((state) => state.board.gameOver);
    const guessedword = useSelector((state) => state.board.guessedWord);
    const correctword = useSelector((state) => state.board.correctWord);
    console.log("render");

    const getRandomWord = (data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        return data[randomIndex];
    };

    const getData = async () => {
        fetch(wordbank)
            .then((response) => response.text())
            .then((text) => {
                let wordArray;
                if (text.includes("\r")) {
                    wordArray = text.split("\r\n");
                } else {
                    wordArray = text.split("\n");
                }
                dispatch(setListWord(wordArray));
                const randomWord = getRandomWord(wordArray);
                dispatch(setWord(randomWord?.toUpperCase()));
                console.log(wordArray);
            })
            .catch((error) => {
                console.log("Đã xảy ra lỗi khi đọc file:", error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="App">
            <nav>
                <h1>Wordle</h1>
                <h2>Another Wordle Clone</h2>
            </nav>
            <div className="game">
                <Board />
                <Keyboard />
                {gameover && (
                    <>
                        {guessedword && (
                            <Message
                                title={"Congratulations!"}
                                content={`The correct word is ${correctword}\n Would you like to try again!`}
                            />
                        )}
                        {!guessedword && (
                            <Message
                                title={"Unlucky you"}
                                content={`The correct word is ${correctword}\n Would you like to try again!`}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
