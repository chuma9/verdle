import "./App.css";
import { GameProvider } from "./context/GameContext";
import { Game } from "./components/Game";
import "react-toastify/dist/ReactToastify.min.css";

const App = () => {
    return (
        <GameProvider children={undefined}>
            <Game />
        </GameProvider>
    );
};

export default App;
