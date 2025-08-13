import { naipes, values, valueNames, naipeNames, type Card, type cardValue, type Naipe } from "./types";
import cardsCss from "../styles/cards.css?inline";
import { CardHTML } from "./cards";
import { calculateScore } from "./handCalculator";
import { ScoreBoard } from "./score";

export class DeckGenerator extends HTMLElement {
    private deck: Card[] = [];
    private hand: Card[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.gerarDeck();
        this.shuffleDeck();
        this.fillHand();
        this.render();
    }

    gerarDeck(): void {
        this.deck = [];
        naipes.forEach((naipe) => {
            values.forEach((valor) => {
                const nome = `${valueNames[valor]} de ${naipeNames[naipe]}`;
                this.deck.push({ value: valor, naipe, name: nome });
            });
        });
    }

    getDeck(): Card[] {
        return this.deck;
    }

    shuffleDeck(): void {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j: number = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    fillHand(): void {
        while (this.hand.length < 8) {
            const carta: Card | undefined = this.deck.pop();
            if (carta !== undefined) {
                this.hand.push(carta);
            } else {
                break;
            }
        }
    }

    removeSelectedCards(scoreBoard: ScoreBoard): void {
        const selectedCards = this.shadowRoot?.querySelectorAll(".carta.selecionada");
        if (selectedCards) {
            const indexes: number[] = [];
            selectedCards.forEach((card) => {
                indexes.push(
                    card.getAttribute("data-index") ? parseInt(card.getAttribute("data-index") || "0", 10) : 0
                );
            });
            if (indexes.length === 0) {
                return;
            }
            indexes.sort((a, b) => b - a); // Ordena os índices em ordem decrescente
            // Remove as cartas selecionadas da mão
            indexes.forEach((index) => {
                this.hand.splice(index, 1);
            });
            scoreBoard.decrementDiscards();
            this.fillHand();
            this.render();
        }
    }

    playSelectedCards(): { points: number; hand: string } | boolean {
        const selectedCards = this.shadowRoot?.querySelectorAll(".carta.selecionada");
        if (selectedCards?.length && selectedCards.length > 0) {
            const indexes: number[] = [];
            let cards: Card[] = [];
            selectedCards.forEach((card) => {
                cards.push({
                    value: card.getAttribute("data-valor") as cardValue,
                    naipe: card.getAttribute("data-naipe") as Naipe,
                    name: card.getAttribute("data-name") || "",
                });
            });
            const calculatedScore: { points: number; hand: string } | number = calculateScore(cards);
            if (typeof calculatedScore === "number") {
                return false;
            }

            selectedCards.forEach((card) => {
                indexes.push(
                    card.getAttribute("data-index") ? parseInt(card.getAttribute("data-index") || "0", 10) : 0
                );
            });
            indexes.sort((a, b) => b - a);
            indexes.forEach((index) => {
                this.hand.splice(index, 1);
            });
            this.fillHand();
            this.render();
            return calculatedScore;
        }
        return false;
    }

  

    render(): void {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = "";

        const style = document.createElement("style");
        style.textContent = cardsCss;
        this.shadowRoot.appendChild(style);

        const cardsContainer = document.createElement("div");
        cardsContainer.classList.add("cards-container");

        this.hand.forEach((carta, index) => {
            const cardHTML = new CardHTML(carta);
            const div = cardHTML.genereteElement(index.toString(), (event) => {
                const target = event.currentTarget as HTMLElement;
                target.classList.toggle("selecionada");

                const selecionadas = this.shadowRoot?.querySelectorAll(".carta.selecionada");
                if (selecionadas && selecionadas.length > 5) {
                    target.classList.remove("selecionada");
                }
            });

            cardsContainer.appendChild(div);
        });

        this.shadowRoot.appendChild(cardsContainer);
    }
}

customElements.define("deck-generator", DeckGenerator);
