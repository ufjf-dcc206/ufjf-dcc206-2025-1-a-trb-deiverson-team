import type { Card } from "./types";

export class CardHTML {
    private card: Card;

    constructor(card: Card) {
        this.card = card;
    }

    genereteElement(index: string, onClick?: (event: MouseEvent) => void): HTMLDivElement {
        const div = document.createElement("div");
        div.classList.add("carta");

        const classeCor = this.card.naipe === "♥" || this.card.naipe === "♦" ? "naipe-vermelho" : "naipe-preto";
        div.classList.add(classeCor);

        div.innerHTML = `
            <div class="valor-canto top-left">${this.card.value}<br>${this.card.naipe}</div>
            <div class="naipe-centro">${this.card.naipe}</div>
            <div class="valor-canto bottom-right">${this.card.value}<br>${this.card.naipe}</div>
        `;
        div.dataset.index = index;

        if (onClick) {
            div.addEventListener("click", onClick);
        }

        return div;
    }
}
