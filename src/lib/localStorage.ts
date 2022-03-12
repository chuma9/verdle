const gameStateKey = "gameState";

type StoredGameState = {
  gameArray: string[];
  puzzleNumber: number;
  cellSelected: number;
  won: boolean;
  correctLettersIndices: number
};

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState));
};

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey);

  return state ? (JSON.parse(state) as StoredGameState) : null;
};