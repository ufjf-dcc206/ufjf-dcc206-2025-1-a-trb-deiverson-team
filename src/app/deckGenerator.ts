import type { Carta, Naipe, NomesNaipe, NomesValor, ValorDaCarta } from './Card';

const naipes: Naipe[] = ['♠', '♥', '♦', '♣'];
const valores: ValorDaCarta[] = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];

const nomesNaipe: NomesNaipe = {
  '♠': 'Espadas',
  '♥': 'Copas',
  '♦': 'Ouros',
  '♣': 'Paus',
};

const nomesValor: NomesValor = {
  'A': 'Ás',
  '2': 'Dois',
  '3': 'Três',
  '4': 'Quatro',
  '5': 'Cinco',
  '6': 'Seis',
  '7': 'Sete',
  '8': 'Oito',
  '9': 'Nove',
  '10': 'Dez',
  'J': 'Valete',
  'Q': 'Dama',
  'K': 'Rei',
};

export function gerarBaralho(): Carta[] {
  const baralho: Carta[] = [];

  naipes.forEach((naipe) => {
    valores.forEach((valor) => {
      const nome = `${nomesValor[valor]} de ${nomesNaipe[naipe]}`;
      baralho.push({ valor, naipe, nome });
    });
  });

  return baralho;
}
