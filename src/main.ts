import { gerarBaralho } from './app/deckGenerator';
import './styles/cards.css'; // Importe o CSS

const baralho = gerarBaralho();
const container = document.getElementById('app');

if (container) {
  container.classList.add('cartas-container');

  baralho.forEach((carta) => {
    const div = document.createElement('div');
    div.classList.add('carta');

    const classeCor = carta.naipe === '♥' || carta.naipe === '♦'
      ? 'naipe-vermelho'
      : 'naipe-preto';
    div.classList.add(classeCor);

    div.innerHTML = `
      <div class="valor-canto top-left">${carta.valor}<br>${carta.naipe}</div>
      <div class="naipe-centro">${carta.naipe}</div>
      <div class="valor-canto bottom-right">${carta.valor}<br>${carta.naipe}</div>
    `;

    container.appendChild(div);
  });
}
