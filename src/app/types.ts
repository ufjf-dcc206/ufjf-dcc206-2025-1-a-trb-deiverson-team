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
    name: string; // Ex: "Ás de Copas"
}

export const naipes: Naipe[] = ["♠", "♥", "♦", "♣"];

export const values: cardValue[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export const naipeNames: NaipeNames = { "♠": "Espadas", "♥": "Copas", "♦": "Ouros", "♣": "Paus" };

export const valueNames: ValueNames = {
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
