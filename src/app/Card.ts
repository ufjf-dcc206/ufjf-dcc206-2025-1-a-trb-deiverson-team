export type Naipe = '♠' | '♥' | '♦' | '♣';
export type ValorDaCarta =
  | 'A'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K';

export interface Carta {
  valor: ValorDaCarta;
  naipe: Naipe;
  nome: string; // Ex: "Ás de Copas"
}

export type NomesNaipe = {
  '♠': 'Espadas';
  '♥': 'Copas';
  '♦': 'Ouros';
  '♣': 'Paus';
};

export type NomesValor = {
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