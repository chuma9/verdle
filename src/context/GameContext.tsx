import React, { createContext, useState } from "react";

const GameContext = createContext(undefined);

const GameProvider = ({ children }) => {
    const [context, setContext] = useState({
        letterSelected: "",
        puzzleNumber: -1,
        gameArray: [],
        solution: "",
        cellSelected: 0,
        correctLettersIndices: [],
        won: false,
        shouldHighlight: true,
    });

    return (
        <GameContext.Provider value={[context, setContext]}>
            {children}
        </GameContext.Provider>
    );
};

export { GameContext, GameProvider };
