import { DeckGenerator } from "./app/deckGenerator";
import { ScoreBoard } from "./app/score";

import "./styles/board-game.css";
import "./styles/body.css";
import "./styles/buttons.css";

let deck: DeckGenerator = new DeckGenerator();
let scoreBoard: ScoreBoard = new ScoreBoard();

const boardgame = document.getElementById("boardgame");
const buttons: HTMLElement | null = document.getElementById("buttons");
const sideBar: HTMLElement | null = document.getElementById("sidebar");

insertScoreBoard();
insertBoardGame();
insertbuttons();

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
            if (scoreBoard.getNumberOfDiscards() > 0) {
                deck.removeSelectedCards(scoreBoard);
            }
        });

        buttons.appendChild(buttonDescartar);

        const buttonPlay = document.createElement("button");
        buttonPlay.classList.add("btn-play");
        buttonPlay.innerText = "Jogar Selecionadas";
        buttonPlay.addEventListener("click", () => {
            let handScore: { points: number; hand: string } | boolean = deck.playSelectedCards();

            if (typeof handScore === "boolean") {
                return;
            }

            scoreBoard.addScore(handScore.points);
            scoreBoard.increaseGoal();
            scoreBoard.decrementPlays();

        });

        buttons.appendChild(buttonPlay);
    }
}

function insertBoardGame() {
    if (boardgame) {
        boardgame.classList.add("board-game");
        const boardGameContainer = document.createElement("div");
        boardGameContainer.classList.add("board-game-container");
        boardGameContainer.appendChild(deck);
        boardgame.appendChild(boardGameContainer);
    }
}

function insertScoreBoard() {
    if (sideBar) {
        const scoreBoardContainer = document.createElement("div");
        scoreBoardContainer.classList.add("scoreboard");
        scoreBoardContainer.appendChild(scoreBoard);
        sideBar.appendChild(scoreBoardContainer);
    }
}
