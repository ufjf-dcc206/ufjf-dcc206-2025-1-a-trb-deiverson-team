import { DeckGenerator } from "./app/deckGenerator";
import { ScoreBoard } from "./app/score";

import "./styles/board-game.css";
import "./styles/body.css";
import "./styles/buttons.css";

//constantes
const boardgame = document.getElementById("boardgame");
const buttons: HTMLElement | null = document.getElementById("buttons");
const sideBar: HTMLElement | null = document.getElementById("sidebar");

//variáveis
let deck: DeckGenerator = new DeckGenerator();
let scoreBoard: ScoreBoard = new ScoreBoard();
let continueToPlay: boolean = true;

//inserindo elementos no DOM
insertScoreBoard();
insertbuttons();
insertBoardGame();


//__________ functions __________

function insertbuttons() {
    if (buttons) {
        insertResetButton(buttons);
        insertDiscardButton(buttons);
        insertPlayButton(buttons);
    }
}

function insertBoardGame() {
    if (boardgame) {
        boardgame.classList.add("board-game");
        const boardGameContainer = document.createElement("div");
        boardGameContainer.classList.add("board-game-container");
        boardGameContainer.appendChild(deck);
        deck.remove();
        deck = new DeckGenerator();
        boardgame.appendChild(boardGameContainer);
        boardgame.appendChild(deck);
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

function insertResetButton(buttons: HTMLElement | null = document.getElementById("buttons")) {
    const buttonReRender = document.createElement("button");
    buttonReRender.classList.add("btn-reset");
    buttonReRender.innerText = "Reiniciar Jogo";
    buttonReRender.addEventListener("click", () => {
        deck.remove();
        deck = new DeckGenerator();
        boardgame?.appendChild(deck);
      
        scoreBoard.resetScoreBoard();
        continueToPlay = true;
    });
    buttons?.appendChild(buttonReRender);
}

function insertDiscardButton(buttons: HTMLElement | null = document.getElementById("buttons")) {
    const buttonDescartar = document.createElement("button");
    buttonDescartar.classList.add("btn-discard");
    buttonDescartar.innerText = "Descartar Selecionadas";
    buttonDescartar.addEventListener("click", () => {
        if (continueToPlay && scoreBoard.getNumberOfDiscards() > 0) {
            deck.removeSelectedCards(scoreBoard);
        }
    });

    buttons?.appendChild(buttonDescartar);
}

function insertPlayButton(buttons: HTMLElement | null = document.getElementById("buttons")) {
    const buttonPlay = document.createElement("button");
    buttonPlay.classList.add("btn-play");
    buttonPlay.innerText = "Jogar Selecionadas";
    buttonPlay.addEventListener("click", () => {
        if (continueToPlay && scoreBoard.getNumberOfPlays() > 0) {
            let handScore: { points: number; hand: string } | boolean = deck.playSelectedCards();
            //Se nenhuma carta foi selecionada ou se a pontuação é inválida
            if (typeof handScore === "boolean") {
                return;
            }
            scoreBoard.addScore(handScore.points);
            scoreBoard.decrementPlays();
            continueToPlay = scoreBoard.verifyGoal();
            scoreBoard.increaseGoal();
        }
    });

    buttons?.appendChild(buttonPlay);
}
