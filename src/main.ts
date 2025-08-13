import { DeckGenerator } from "./app/deckGenerator";
import { ScoreBoard } from "./app/score";
import type { typeOfMessage } from "./app/types";

import "./styles/board-game.css";
import "./styles/body.css";
import "./styles/buttons.css";
import "./styles/messages.css";

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
        insertResetButton();
        insertDiscardButton();
        insertPlayButton();
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

function criarBotao(
    text: string,
    buttonClass: string,
    onclick: () => void,
    container: HTMLElement | null = document.getElementById("buttons")
) {
    if (!container) return;

    const botao = document.createElement("button");
    botao.classList.add(buttonClass);
    botao.innerText = text;
    botao.addEventListener("click", onclick);

    container.appendChild(botao);
}

function insertResetButton() {
    criarBotao("Reiniciar Jogo", "btn-reset", () => {
        deck.remove();
        deck = new DeckGenerator();
        boardgame?.appendChild(deck);

        scoreBoard.resetScoreBoard();
        adicionarMensagem("Jogo reiniciado!", 5, "info");
        continueToPlay = true;
    });
}

function insertDiscardButton() {
    criarBotao("Descartar Selecionadas", "btn-discard", () => {
        if (!continueToPlay) {
            adicionarMensagem("Por favor, reinicie o jogo!", 5, "error");
            return;
        }

        if (scoreBoard.getNumberOfDiscards() <= 0) {
            adicionarMensagem("Você não tem mais descartes disponíveis!", 5, "error");
            return;
        }

        const cartasSelecionadas = deck.shadowRoot?.querySelectorAll(".carta.selecionada");
        if (!cartasSelecionadas || cartasSelecionadas.length === 0) {
            adicionarMensagem("Selecione pelo menos uma carta para descartar!", 5, "error");
            return;
        }

        deck.removeSelectedCards(scoreBoard);
    });
}

function insertPlayButton() {
    criarBotao("Jogar Selecionadas", "btn-play", () => {
        if (!continueToPlay) {
            adicionarMensagem("Por favor, reinicie o jogo!", 5, "error");
            return;
        }

        if (scoreBoard.getNumberOfPlays() <= 0) {
            adicionarMensagem("Você não tem mais jogadas disponíveis!", 5, "error");
            if (scoreBoard.verifyGoal()) {
                adicionarMensagem("Você venceu!", 5, "info");
                adicionarMensagem("Reinicie o jogo para jogar novamente!", 5, "info");
            }
            return;
        }

        const result = deck.playSelectedCards();

        if (typeof result === "boolean") {
            adicionarMensagem("Selecione pelo menos uma carta!", 5, "error");
            return;
        }

        scoreBoard.addScore(result.points);
        scoreBoard.decrementPlays();
        continueToPlay = scoreBoard.verifyGoal();

        adicionarMensagem(`Você jogou: ${result.hand}`, 5);

        if (!continueToPlay) {
            adicionarMensagem("Você não atingiu a pontuação necessária!", 5, "defeated");
            return;
        }

        if (scoreBoard.getNumberOfPlays() === 0 && scoreBoard.verifyGoal()) {
            adicionarMensagem("Você venceu!", 8, "winner");
            adicionarMensagem("Reinicie o jogo para jogar novamente!", 5, "info");
            return;
        }

        scoreBoard.increaseGoal();
    });
}

function obterOuCriarContainerMensagens(): HTMLElement {
    let container = document.getElementById("message-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "message-container";
        boardgame?.appendChild(container);
    }
    return container;
}

function adicionarMensagem(message: string, seconds: number, type: typeOfMessage = "info") {
    const container = obterOuCriarContainerMensagens();

    const msg = document.createElement("div");
    msg.textContent = message;
    msg.classList.add("msg", type);

    container.appendChild(msg);

    requestAnimationFrame(() => msg.classList.add("show"));

    setTimeout(() => {
        msg.classList.remove("show");
        setTimeout(() => msg.remove(), 300);
    }, seconds * 1000);
}
