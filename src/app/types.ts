export type Naipe = "♠" | "♥" | "♦" | "♣";
export type cardValue = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";
export type NaipeNames = { "♠": "Espadas"; "♥": "Copas"; "♦": "Ouros"; "♣": "Paus" };
export type ValueNames = {
    A: "Ás";
    "2": "Dois";
    "3": "Três";
    "4": "Quatro";
    "5": "Cinco";
    "6": "Seis";
    "7": "Sete";
    "8": "Oito";
    "9": "Nove";
    "10": "Dez";
    J: "Valete";
    Q: "Dama";
    K: "Rei";
};
export interface Card {
    value: cardValue;
    naipe: Naipe;
    name?: string; // Ex: "Ás de Copas"
}

export const naipes: Naipe[] = ["♠", "♥", "♦", "♣"];

export const values: cardValue[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export const naipeNames: NaipeNames = { "♠": "Espadas", "♥": "Copas", "♦": "Ouros", "♣": "Paus" };

export const valueNames: { [key: string]: string } = {
    A: "Ás",
    "2": "Dois",
    "3": "Três",
    "4": "Quatro",
    "5": "Cinco",
    "6": "Seis",
    "7": "Sete",
    "8": "Oito",
    "9": "Nove",
    "10": "Dez",
    J: "Valete",
    Q: "Dama",
    K: "Rei",
};

//Para controle do score
export const valueToNumber: { [key: string]: number } = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
};

export type ResultadoPontuacao = {
    nome: string;
    cartas: Card[];
    pontos: number;
};

export const translationHandTypes: { [key: string]: string } = {
    "Royal Flush": "Sequência Real",
    "Straight Flush": "Sequência de mesmo naipe",
    "Four of a Kind": "Quadra",
    "Full House": "Full House",
    Flush: "Flush",
    Straight: "Sequência",
    "Three of a Kind": "Trinca",
    "Two Pair": "Dois Pares",
    "One Pair": "Um Par",
    "High Card": "Carta Alta",
};

export type typeOfMessage = "info" | "error" | "defeated" | "winner";
