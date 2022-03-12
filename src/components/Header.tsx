import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { GameContext } from "../context/GameContext";
import { Modal } from "./InstructionModal";

export const Header = () => {
    const [context] = useContext(GameContext);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const getTextToShare = () => {
        let shareGrid = "";
        let rowsGuessed = 0;
        for (let i = 0; i < context.gameArray.length; i++) {
            if (context.gameArray[i] == "") {
                break;
            }

            if (i % 5 == 0) {
                shareGrid += "\n";
                rowsGuessed += 1;
            }

            shareGrid += context.correctLettersIndices.includes(i)
                ? "🟩"
                : "⬜";
        }

        const attempts = context.won ? rowsGuessed : "X";
        return `Verdle #${context.puzzleNumber}  ${attempts}/6\n` + shareGrid;
    };

    const copyToClipboard = () => {
        const listener = (e: ClipboardEvent) => {
            e.clipboardData.setData("text/plain", getTextToShare());
            e.preventDefault();
            document.removeEventListener("copy", listener);
        };
        document.addEventListener("copy", listener);
        document.execCommand("copy");

        toast("Copied to clipboard");
    };

    return (
        <div className="header">
            <button id="help" onClick={() => openModal()}></button>
            {showModal && <Modal setShowModal={setShowModal} />}
            {context.cellSelected == context.gameArray.length && (
                <button
                    id="share_button"
                    onClick={() => copyToClipboard()}
                ></button>
            )}

            <div className="title">VERDLE</div>
            <div className="puzzle_number">#{context.puzzleNumber}</div>
        </div>
    );
};
