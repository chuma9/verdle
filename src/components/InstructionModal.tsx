import React from "react";

export const Modal = ({ setShowModal }) => {
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="modal_container" onClick={closeModal}>
            <div className="modal">
                <h2>HOW TO PLAY</h2>
                <div className="instructions">
                    <p>
                        Guess the <strong>VERDLE</strong> in 6 tries.
                    </p>
                    <p>
                        Each guess must be a valid 5 letter word. Hit the enter
                        button to submit.
                    </p>
                    <p>
                        After each guess, the color of the tiles will change to
                        show how close your guess was to the word.
                    </p>
                    <div className="examples">
                        <p>
                            <strong>Examples</strong>
                        </p>
                        <div className="example">
                            <div className="game_board">
                                <div className="game_cell correct">A</div>
                                <div className="game_cell userfilled">B</div>
                                <div className="game_cell userfilled">B</div>
                                <div className="game_cell userfilled">E</div>
                                <div className="game_cell userfilled">Y</div>
                            </div>
                            <div className="explainer">
                                The letter <strong>A</strong> is in the word and
                                in the correct spot.
                            </div>
                        </div>
                        <div className="example">
                            <div className="game_board">
                                <div className="game_cell userfilled">C</div>
                                <div className="game_cell userfilled">U</div>
                                <div className="game_cell userfilled">T</div>
                                <div className="game_cell userfilled">E</div>
                                <div className="game_cell userfilled highlight">
                                    R
                                </div>

                                <div className="game_cell userfilled">S</div>
                                <div className="game_cell userfilled">T</div>
                                <div className="game_cell userfilled">A</div>
                                <div className="game_cell userfilled highlight">
                                    R
                                </div>
                                <div className="game_cell"></div>
                            </div>
                            <div className="explainer">
                                The letter <strong>R</strong> in the second row
                                is the current letter. All previous{" "}
                                <strong>R</strong>s are highlighted to show what
                                positions you've already tried it in.
                            </div>
                        </div>
                    </div>
                    <p>
                        Unlike Wordle, this game does not highlight letters that
                        are in the word but in the the wrong spot or letters
                        that are not in the word at all.
                    </p>
                    <p>
                        <strong>
                            A new VERDLE will be available each day!
                            <strong></strong>
                        </strong>
                    </p>
                    <strong>
                        <strong></strong>
                    </strong>
                </div>
                <button onClick={() => setShowModal(false)}>X</button>
            </div>
        </div>
    );
};
