import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import Confetti from "react-confetti";
import { DateTime, Interval } from "luxon";
import { GameBoard } from "./GameBoard";
import { Keyboard } from "./Keyboard";
import { Header } from "./Header";
import { GameContext } from "../context/GameContext";
import { solutions } from "../context/solutions";
import { vocab } from "../context/vocab";
import {
    loadGameStateFromLocalStorage,
    saveGameStateToLocalStorage,
} from "../lib/localStorage";

export const Game = () => {
    const [context, setContext] = useContext(GameContext);
    const [shake, setShake] = useState<boolean>(false);
    const [keyPressed, setKeyPressed] = useState<string>("");
    const [localStorageUpdateTrigger, setLocalStorageUpdateTrigger] =
        useState<boolean>(false);

    const setGameArray = (array) => {
        setContext((context) => ({ ...context, gameArray: array }));
    };

    const setLetterSelected = (letter) => {
        setContext((context) => ({ ...context, letterSelected: letter }));
    };

    const setCellSelected = (cell) => {
        setContext((context) => ({ ...context, cellSelected: cell }));
    };

    const setSolution = (solution) => {
        setContext((context) => ({ ...context, solution: solution }));
    };

    const setWon = (won) => {
        setContext((context) => ({ ...context, won: won }));
    };

    const setShouldHighlight = (shouldHighlight) => {
        setContext((context) => ({
            ...context,
            shouldHighlight: shouldHighlight,
        }));
    };

    const setcorrectLettersIndices = (indices) => {
        setContext((context) => ({
            ...context,
            correctLettersIndices: indices,
        }));
    };

    const createNewGame = () => {
        const loaded = loadGameStateFromLocalStorage();
        const puzzleNumber = getPuzzleNumber();

        setContext((context) => ({ ...context, puzzleNumber: puzzleNumber }));
        setLetterSelected("");
        setSolution(getSolution(puzzleNumber));

        if (loaded?.puzzleNumber === puzzleNumber) {
            // restore game
            setGameArray(loaded.gameArray);
            setCellSelected(loaded.cellSelected);
            setWon(loaded.won);
            setcorrectLettersIndices(loaded.correctLettersIndices);
        }
    };

    const wordLength = 5;
    const vocabSet = new Set(vocab.concat(solutions));

    const isSolved = (rowStart: number) => {
        const guess = context.gameArray
            .slice(rowStart, rowStart + wordLength)
            .join("");
        return guess === context.solution.toUpperCase();
    };

    const validWord = (guess: string) => {
        return vocabSet.has(guess.toLowerCase());
    };

    const getCurrentRowStart = () => {
        const row = Math.floor(context.cellSelected / wordLength);
        return row * wordLength;
    };

    const getSolution = (puzzleNumber) => {
        return solutions[puzzleNumber - 1];
    };

    const getPuzzleNumber = () => {
        const start = DateTime.local(2022, 2, 6, 0, 0);
        const dayInterval = Interval.fromDateTimes(
            start,
            DateTime.now()
        ).length("days");

        const solutionIdx = Math.floor(dayInterval) % solutions.length;
        return solutionIdx + 1;
    };

    const setLetter = (index: number, letter: string) => {
        const updatedGameArray = context.gameArray.slice();
        updatedGameArray[index] = letter;
        setGameArray(updatedGameArray);
        setLetterSelected(letter);
    };

    const isCellLetterCorrect = (indexOfArray: number) => {
        const solutionIdx = indexOfArray % wordLength;
        if (
            context.gameArray[indexOfArray] ===
            context.solution.charAt(solutionIdx).toUpperCase()
        ) {
            return true;
        }
        return false;
    };

    const onClickCell = (indexOfArray: number) => {
        if (context.won) {
            return;
        }

        if (isInCurrentRow(indexOfArray)) {
            setCellSelected(indexOfArray);
        }
    };

    const onClickLetter = (letter: string) => {
        setShake(false);
        setShouldHighlight(true);
        if (context.won) {
            return;
        }
        setLetterSelected(letter);
        setLetter(context.cellSelected, letter);

        if (isInCurrentRow(context.cellSelected + 1)) {
            setCellSelected(context.cellSelected + 1);
        }
    };

    const onClickErase = () => {
        if (context.won) {
            return;
        }

        if (
            context.gameArray[context.cellSelected] &&
            context.gameArray[context.cellSelected] !== ""
        ) {
            setLetter(context.cellSelected, "");
        } else if (isInCurrentRow(context.cellSelected - 1)) {
            setLetter(context.cellSelected - 1, "");
            setCellSelected(context.cellSelected - 1);
        }
    };

    const onClickEnter = () => {
        const rowStart = getCurrentRowStart();
        const guess = context.gameArray
            .slice(rowStart, rowStart + wordLength)
            .join("");

        if (guess.length < 5 || context.won) {
            return;
        }

        if (!validWord(guess)) {
            toast("Not in word list", {
                toastId: "not-in-word-list",
            });
            return;
        }

        for (let i = rowStart; i < rowStart + 5; i++) {
            if (isCellLetterCorrect(i)) {
                context.correctLettersIndices.push(i);
                setcorrectLettersIndices(context.correctLettersIndices);
            }
        }

        setShouldHighlight(false);
        setLocalStorageUpdateTrigger(!localStorageUpdateTrigger);

        if (isSolved(rowStart)) {
            setWon(true);
            setCellSelected(context.gameArray.length);
            toast("Nice!", {
                autoClose: 1000,
            });
        } else {
            if (
                !context.gameArray
                    .slice(rowStart, rowStart + wordLength)
                    .includes("")
            ) {
                setCellSelected(rowStart + 5);
                if (context.cellSelected === context.gameArray.length - 1) {
                    toast(context.solution, {
                        autoClose: false,
                        bodyClassName: "solution_toast",
                    });
                } else {
                    setShake(true);
                }
            }
        }
    };

    const isInCurrentRow = (indexOfArray: number) => {
        const currentRowStart = getCurrentRowStart();
        return (
            indexOfArray >= currentRowStart &&
            indexOfArray < currentRowStart + wordLength
        );
    };

    const handleKeyUp = () => {
        const letters = new Set([
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
        ]);

        if (keyPressed === "ENTER") {
            onClickEnter();
        } else if (keyPressed === "BACKSPACE") {
            onClickErase();
        } else if (letters.has(keyPressed)) {
            onClickLetter(keyPressed);
        }
        setKeyPressed("");
    };

    useEffect(() => {
        createNewGame();
    }, []);

    useEffect(() => {
        const gameArray = context.gameArray;
        const puzzleNumber = context.puzzleNumber;
        const cellSelected = context.cellSelected;
        const won = context.won;
        const correctLettersIndices = context.correctLettersIndices;

        saveGameStateToLocalStorage({
            gameArray,
            puzzleNumber,
            cellSelected,
            won,
            correctLettersIndices,
        });
    }, [localStorageUpdateTrigger]);

    useEffect(() => {
        if (keyPressed && !context.won) {
            handleKeyUp();
        }
    }, [keyPressed]);

    useEffect(() => {
        const handleKeyUp = (event) => {
            setKeyPressed(event.key.toUpperCase());
        };
        window.document.addEventListener("keyup", handleKeyUp);

        return () => {
            window.document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return (
        <>
            <div className={shake ? "container shake" : "container"}>
                <Header />
                <ToastContainer
                    className="toast_container"
                    position="top-center"
                    autoClose={1300}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    limit={1}
                    pauseOnHover={false}
                />
                <GameBoard
                    onClick={(indexOfArray: number) =>
                        onClickCell(indexOfArray)
                    }
                />
                <Keyboard
                    onClickLetter={(letter: string) => onClickLetter(letter)}
                    onClickErase={() => onClickErase()}
                    onClickEnter={() => onClickEnter()}
                />
                <Confetti
                    run={context.won}
                    recycle={false}
                    numberOfPieces={400}
                    wind={0.01}
                    gravity={0.07}
                />
            </div>
        </>
    );
};
