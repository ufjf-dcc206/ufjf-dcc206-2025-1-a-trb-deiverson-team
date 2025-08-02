import { DeckGenerator } from "./app/deckGenerator";
// import './styles/cards.css'; // Importe o CSS
import "./styles/board-game.css";
import "./styles/body.css";

const deck: DeckGenerator = new DeckGenerator();
// deck.getBaralho();

const container = document.getElementById("app");

if (container) {
    container.classList.add("board-game");

    container.appendChild(deck);
}
