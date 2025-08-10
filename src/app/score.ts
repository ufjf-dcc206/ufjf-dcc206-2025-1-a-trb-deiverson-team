import boardCss from "../styles/score.css/?inline";
export class ScoreBoard extends HTMLElement {
    private goal: number = 100;
    private score: number = 0;
    private numberOfDiscards: number = 3;
    private numberOfPlays: number = 4;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    private render(): void {
        if (!this.shadowRoot) return;
        this.shadowRoot.innerHTML = "";
        const style = document.createElement("style");
        style.textContent = boardCss;
        this.shadowRoot.appendChild(style);
        const container = document.createElement("div");
        container.classList.add("scoreboard");
        container.innerHTML = `
            <div class="item">Goal: ${this.goal}</div>
            <div class="item">Score: ${this.score}</div>
            <div class="item">Discards: ${this.numberOfDiscards}</div>
            <div class="item">Plays: ${this.numberOfPlays}</div>
        `;
        this.shadowRoot.appendChild(container);
    }

    public addScore(valor: number): void {
        this.score += valor;
        this.render();
    }

    public getNumberOfDiscards(): number {
        return this.numberOfDiscards;
    }

    public getNumberOfPlays(): number {
        return this.numberOfPlays;
    }

    public decrementDiscards(): void {
        if (this.numberOfDiscards > 0) {
            this.numberOfDiscards--;
            this.render();
        }
    }
    public increaseGoal(): void {
        this.goal += 100 * (4 - this.numberOfPlays);
        this.render();
    }

    public decrementPlays(): void {
        if (this.numberOfPlays > 0) {
            this.numberOfPlays--;
            this.render();
        }
    }
    public resetScoreBoard(): void {
        this.score = 0;
        this.goal = 100;
        this.numberOfDiscards = 3;
        this.numberOfPlays = 4;
        this.render();
    }
}

customElements.define("score-board", ScoreBoard);
