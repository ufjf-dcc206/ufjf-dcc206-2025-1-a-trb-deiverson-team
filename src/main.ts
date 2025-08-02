import { DeckGenerator } from "./app/deckGenerator";
// import './styles/cards.css'; // Importe o CSS
import "./styles/board-game.css";
import "./styles/body.css";

let deck: DeckGenerator = new DeckGenerator();
// deck.getBaralho();

const container = document.getElementById("app");

if (container) {
    container.classList.add("board-game");
    const boardGameContainer = document.createElement("div");
    boardGameContainer.classList.add("board-game-container");
    boardGameContainer.appendChild(deck);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("btn-container");

    const buttonReRender = document.createElement("button");
    buttonReRender.classList.add("btn-reset");
    buttonReRender.innerText = "Reiniciar Jogo";
    buttonReRender.addEventListener("click", () => {
        deck.remove();
        deck = new DeckGenerator();
        boardGameContainer.appendChild(deck);
    });
    buttonContainer.appendChild(buttonReRender);

    const buttonDescartar = document.createElement("button");
    buttonDescartar.classList.add("btn-discard");
    buttonDescartar.innerText = "Descartar Selecionadas";
    buttonDescartar.addEventListener("click", () => {
        deck.removeSelectedCards();
    });

    buttonContainer.appendChild(buttonDescartar);

    container.appendChild(boardGameContainer);
    container.appendChild(buttonContainer);
}
