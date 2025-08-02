import { naipes, valores, nomesValor, nomesNaipe, type Carta } from "./Card";
import cardsCss from "../styles/cards.css?inline";

export class DeckGenerator extends HTMLElement {
    private deck: Carta[] = [];
    private hand: Carta[] = [];

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
            valores.forEach((valor) => {
                const nome = `${nomesValor[valor]} de ${nomesNaipe[naipe]}`;
                this.deck.push({ valor, naipe, nome });
            });
        });
    }

    getDeck(): Carta[] {
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
            const carta: Carta | undefined = this.deck.pop();
            if (carta !== undefined) {
                this.hand.push(carta);
            } else {
                break;
            }
        }
    }

    removeSelectedCards(): void {
        const selectedCards = this.shadowRoot?.querySelectorAll(".carta.selecionada");
        if (selectedCards) {
            const indexes: number[] = [];
            selectedCards.forEach((card) => {
                indexes.push(
                    card.getAttribute("data-index") ? parseInt(card.getAttribute("data-index") || "0", 10) : 0
                );
            });
            indexes.sort((a, b) => b - a); // Ordena os índices em ordem decrescente
            // Remove as cartas selecionadas da mão
            indexes.forEach((index) => {
                this.hand.splice(index, 1);
            });
            this.fillHand();
            this.render();
        }
    }

    render(): void {
        if (!this.shadowRoot) return;

        // Limpa o conteúdo atual
        this.shadowRoot.innerHTML = "";

        // Aplica o CSS
        const style = document.createElement("style");
        style.textContent = cardsCss;
        this.shadowRoot.appendChild(style);

        // Cria container das cartas
        const cardsContainer = document.createElement("div");
        cardsContainer.classList.add("cards-container");

        this.hand.forEach((carta) => {
            const div = document.createElement("div");
            div.classList.add("carta");

            const classeCor = carta.naipe === "♥" || carta.naipe === "♦" ? "naipe-vermelho" : "naipe-preto";
            div.classList.add(classeCor);

            div.innerHTML = `
            <div class="valor-canto top-left">${carta.valor}<br>${carta.naipe}</div>
            <div class="naipe-centro">${carta.naipe}</div>
            <div class="valor-canto bottom-right">${carta.valor}<br>${carta.naipe}</div>
        `;

            div.dataset.index = this.hand.indexOf(carta).toString();

            // Agora sim o event listener vai funcionar
            div.addEventListener("click", (event) => {
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
