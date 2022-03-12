import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

export const Keyboard = ({ onClickLetter, onClickErase, onClickEnter }) => {
    const [context] = useContext(GameContext);
    const keyNames = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Erase"],
    ];

    const createKey = (value: string) => {
        const correctLetters = [];
        const column = context.cellSelected % 5;
        const previousGuesses = context.gameArray.slice(
            0,
            context.cellSelected - column
        );
        for (let i = 0; i < previousGuesses.length; i++) {
            if (context.correctLettersIndices.indexOf(i) > -1) {
                correctLetters.push(previousGuesses[i]);
            }
        }

        if (value === "Enter") {
            return (
                <button
                    className="keyboard_key keyboard_enter"
                    key={value}
                    onClick={() => onClickEnter()}
                >
                    {"Enter"}
                </button>
            );
        } else if (value === "Erase") {
            return (
                <button
                    className="keyboard_key keyboard_erase"
                    key={value}
                    onClick={() => onClickErase()}
                >
                    {"⌫"}
                </button>
            );
        } else {
            if (correctLetters.indexOf(value) > -1) {
                return (
                    <button
                        className="keyboard_key keyboard_correct"
                        key={value}
                        onClick={() => onClickLetter(value)}
                    >
                        {value}
                    </button>
                );
            } else {
                return (
                    <button
                        className="keyboard_key"
                        key={value}
                        onClick={() => onClickLetter(value)}
                    >
                        {value}
                    </button>
                );
            }
        }
    };

    return (
        <div className="keyboard">
            {Array.from(Array(keyNames.length).keys()).map((row) => {
                return (
                    <div className="keys_row" key={row}>
                        {keyNames[row].map((keyName) => {
                            return createKey(keyName);
                        })}
                    </div>
                );
            })}
        </div>
    );
};
