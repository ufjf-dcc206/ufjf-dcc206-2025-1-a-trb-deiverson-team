// import { gerarBaralho } from "./app/deckGenerator";
// import "./styles/cards.css";

// type Carta = ReturnType<typeof gerarBaralho>[number];

// let baralho: Carta[] = [];
// let mao: Carta[] = [];
// let descartesRestantes = 5;

// function embaralhar<T>(array: T[]): T[] {
//     return [...array].sort(() => Math.random() - 0.5);
// }

// function criarElementoCarta(carta: Carta, index: number): HTMLElement {
//     const div = document.createElement("div");
//     div.classList.add("carta");
//     const cor = carta.naipe === "♥" || carta.naipe === "♦" ? "naipe-vermelho" : "naipe-preto";
//     div.classList.add(cor);
//     div.dataset.index = index.toString();

//     div.innerHTML = `
//     <div class="valor-canto valor-top-left">${carta.valor}</div>
//     <div class="naipe-centro">${carta.naipe}</div>
//     <div class="valor-canto valor-bottom-right">${carta.valor}</div>
//   `;

//     div.addEventListener("click", () => {
//         div.classList.toggle("selecionada");
//         const selecionadas = document.querySelectorAll(".carta.selecionada");
//         if (selecionadas.length > 3) {
//             div.classList.remove("selecionada");
//         }
//     });

//     return div;
// }

// function renderizarCartas() {
//     const container = document.getElementById("app");
//     if (!container) return;

//     container.innerHTML = "";

//     const info = document.createElement("div");
//     info.className = "info-bar";
//     info.innerText = `Descartes restantes: ${descartesRestantes}`;
//     container.appendChild(info);

//     const cartasContainer = document.createElement("div");
//     cartasContainer.classList.add("cartas-container");

//     mao.forEach((carta, i) => {
//         const cartaEl = criarElementoCarta(carta, i);
//         cartasContainer.appendChild(cartaEl);
//     });

//     container.appendChild(cartasContainer);

//     const btnDescartar = document.createElement("button");
//     btnDescartar.innerText = "Descartar Selecionadas";
//     btnDescartar.className = "btn-descartar";
//     btnDescartar.addEventListener("click", descartarSelecionadas);
//     container.appendChild(btnDescartar);
// }

// function descartarSelecionadas() {
//     if (descartesRestantes <= 0) return;

//     const selecionadas = Array.from(document.querySelectorAll(".carta.selecionada"));
//     if (selecionadas.length === 0) return;

//     const indicesSelecionados = selecionadas.map((el) => Number(el.getAttribute("data-index")));
//     mao = mao.filter((_, i) => !indicesSelecionados.includes(i));

//     // Comprar novas cartas para completar 8
//     while (mao.length < 8 && baralho.length > 0) {
//         mao.push(baralho.shift()!);
//     }

//     descartesRestantes--;
//     renderizarCartas();
// }

// function mostrarTelaInicial() {
//     const container = document.getElementById("app");
//     if (!container) return;

//     container.innerHTML = `
//     <div class="tela-inicial">
//       <h1>Jogo de Cartas</h1>
//       <button id="comecar">Começar Jogo</button>
//     </div>
//   `;

//     const btn = document.getElementById("comecar");
//     btn?.addEventListener("click", () => {
//         baralho = embaralhar(gerarBaralho());
//         mao = baralho.splice(0, 8);
//         descartesRestantes = 5;
//         renderizarCartas();
//     });
// }

// document.addEventListener("DOMContentLoaded", mostrarTelaInicial);
