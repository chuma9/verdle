import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

export const GameBoard = ({ onClick }) => {
    const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const wordLength = 5;

    const [context] = useContext(GameContext);

    const arrayIndex = (row: number, column: number) => {
        return row * wordLength + column;
    };

    const isCellLetterSameAsSelectedLetter = (indexOfArray: number) => {
        if (!context.letterSelected) {
            return false;
        } else if (context.letterSelected === context.gameArray[indexOfArray]) {
            return true;
        } else {
            return false;
        }
    };

    const createCell = (indexOfArray: number, value: string) => {
        const highlight = isCellLetterSameAsSelectedLetter(indexOfArray);
        const correct =
            context.correctLettersIndices.indexOf(indexOfArray) > -1;
        let className = "game_cell";

        if (context.shouldHighlight && highlight) {
            className += " highlight";
        }

        if (
            Math.floor(indexOfArray / wordLength) ===
            Math.floor(context.cellSelected / wordLength)
        ) {
            // current row
            className += " current";
            if (
                context.gameArray[indexOfArray] &&
                context.gameArray[indexOfArray] !== ""
            ) {
                className += " userfilled";
            }

            return (
                <div
                    className={className}
                    key={indexOfArray}
                    onClick={() => onClick(indexOfArray)}
                >
                    {value}
                </div>
            );
        }

        if (
            Math.floor(indexOfArray / wordLength) <
            Math.floor(context.cellSelected / wordLength)
        ) {
            // row is already set
            className += " userfilled";

            if (correct) {
                className += " correct";
            }
        }

        return (
            <div
                className={className}
                key={indexOfArray}
                onClick={() => onClick(indexOfArray)}
            >
                {value}
            </div>
        );
    };

    return (
        <div className="game_board">
            {rows.map((row) => {
                return Array.from(Array(wordLength).keys()).map((column) => {
                    const indexOfArray = arrayIndex(row, column);
                    const value = context.gameArray[indexOfArray];

                    return createCell(indexOfArray, value);
                });
            })}
        </div>
    );
};
