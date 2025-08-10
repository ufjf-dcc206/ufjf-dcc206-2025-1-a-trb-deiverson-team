import { DeckGenerator } from "./app/deckGenerator";
// import './styles/cards.css'; // Importe o CSS
import "./styles/board-game.css";
import "./styles/body.css";
import "./styles/buttons.css";

let deck: DeckGenerator = new DeckGenerator();
// deck.getBaralho();

const boardgame = document.getElementById("boardgame");
const buttons: HTMLElement | null = document.getElementById("buttons");
console.log("here");
insertbuttons();

insertBoardGame();

function insertBoardGame() {
    if (boardgame) {
        boardgame.classList.add("board-game");
        const boardGameContainer = document.createElement("div");
        boardGameContainer.classList.add("board-game-container");
        boardGameContainer.appendChild(deck);
        boardgame.appendChild(boardGameContainer);
    }
}

insertBoardGame();
function insertbuttons() {
    if (buttons) {
        const buttonReRender = document.createElement("button");
        buttonReRender.classList.add("btn-reset");
        buttonReRender.innerText = "Reiniciar Jogo";
        buttonReRender.addEventListener("click", () => {
            deck.remove();
            deck = new DeckGenerator();
            boardgame?.appendChild(deck);
        });
        buttons.appendChild(buttonReRender);

        const buttonDescartar = document.createElement("button");
        buttonDescartar.classList.add("btn-discard");
        buttonDescartar.innerText = "Descartar Selecionadas";
        buttonDescartar.addEventListener("click", () => {
            deck.removeSelectedCards();
        });

        buttons.appendChild(buttonDescartar);

        const buttonPlay = document.createElement("button");
        buttonPlay.classList.add("btn-play");
        buttonPlay.innerText = "Jogar Selecionadas";
        buttonPlay.addEventListener("click", () => {
            deck.playSelectedCards();
        });

        buttons.appendChild(buttonPlay);
    }
}
