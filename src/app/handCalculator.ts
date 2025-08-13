import { type cardValue, type Card, translationHandTypes, values } from "./types";

export function calculateScore(cards: Card[]): { points: number; hand: string } | number {
    console.log("Calculando pontuação para as cartas:", cards);
    const numberValueCards: number[] = cards.map((card) => valorNumerico(card.value));
    let points = 0;
    let multiplier = 1;
    if (cards.length === 0) return 0;

    const typeOfHand: string = identifyHandType(cards);
    const pointsSum = numberValueCards.reduce((acc, v) => acc + v, 0);
    switch (typeOfHand) {
        case "Royal Flush":
            multiplier = 10;
            points = pointsSum;
            break;
        case "Straight Flush":
            multiplier = 9;
            points = pointsSum;
            break;
        case "Four of a Kind":
            multiplier = 8;
            points = pointsSum;
            break;
        case "Full House":
            multiplier = 7;
            points = pointsSum;
            break;
        case "Flush":
            multiplier = 6;
            points = pointsSum;
            break;
        case "Straight":
            multiplier = 5;
            points = pointsSum;
            break;
        case "Three of a Kind":
            multiplier = 4;
            points = pointsSum;
            break;
        case "Two Pair":
            multiplier = 3;
            points = pointsSum;
            break;
        case "One Pair":
            multiplier = 2;
            points = pointsSum;
            break;
        case "High Card":
            multiplier = 1;
            points = pointsSum;
            break;
        default:
            console.warn("Tipo de mão desconhecido:", typeOfHand);
            multiplier = 1;
            points = pointsSum;
            break;
    }

    return {
        points: points * multiplier,
        hand: ` ${translationHandTypes[typeOfHand]}, Pontos: ${points}, Multiplicador: ${multiplier}, total: ${
            points * multiplier
        }`,
    };
}

function valorNumerico(value: cardValue): number {
    if (value === "A") return 15;
    if (["K", "Q", "J"].includes(value)) return 10;
    return parseInt(value, 10);
}

function isFlush(cards: Card[]): boolean {
    if (cards.length === 0) return false;
    const firstNaipe = cards[0].naipe;
    return cards.every((card) => card.naipe === firstNaipe);
}
function isStraight(cards: Card[]): boolean {
    if (cards.length === 0) return false;
    if (cards.length < 5) return false;
    cards.sort((a, b) => values.indexOf(a.value) - values.indexOf(b.value));
    
    const firstValueIndex = values.indexOf(cards[0].value);
    for (let i = 1; i < cards.length; i++) {
        const currentValueIndex = values.indexOf(cards[i].value);
        if (currentValueIndex !== firstValueIndex + i) {
            return false;
        }
    }
    return true;
}
function isStraightFlush(cards: Card[]): boolean {
    return isFlush(cards) && isStraight(cards);
}

function isRoyalFlush(cards: Card[]): boolean {
    if (!isFlush(cards)) return false;
    const valores = cards.map((card) => card.value);
    return (
        valores.includes("10") &&
        valores.includes("J") &&
        valores.includes("Q") &&
        valores.includes("K") &&
        valores.includes("A")
    );
}

function isFullHouse(cards: Card[]): boolean {
    if (cards.length < 5) return false;
    const valueCount: { [key: string]: number } = {};
    cards.forEach((card) => {
        valueCount[card.value] = (valueCount[card.value] || 0) + 1;
    });
    const counts = Object.values(valueCount);
    return counts.includes(3) && counts.includes(2);
}

function isFourOfAKind(cards: Card[]): boolean {
    if (cards.length < 4) return false;
    const valueCount: { [key: string]: number } = {};
    cards.forEach((card) => {
        valueCount[card.value] = (valueCount[card.value] || 0) + 1;
    });
    return Object.values(valueCount).includes(4);
}

function isThreeOfAKind(cards: Card[]): boolean {
    if (cards.length < 3) return false;
    const valueCount: { [key: string]: number } = {};
    cards.forEach((card) => {
        valueCount[card.value] = (valueCount[card.value] || 0) + 1;
    });
    return Object.values(valueCount).includes(3);
}

function isTwoPair(cards: Card[]): boolean {
    if (cards.length < 4) return false;
    const valueCount: { [key: string]: number } = {};
    cards.forEach((card) => {
        valueCount[card.value] = (valueCount[card.value] || 0) + 1;
    });
    const pairs = Object.values(valueCount).filter((count) => count === 2);
    return pairs.length === 2;
}

function isOnePair(cards: Card[]): boolean {
    if (cards.length < 2) return false;
    const valueCount: { [key: string]: number } = {};
    cards.forEach((card) => {
        valueCount[card.value] = (valueCount[card.value] || 0) + 1;
    });
    return Object.values(valueCount).includes(2);
}
function identifyHandType(cards: Card[]): string {
    const numberOfCardsInHand = cards.length;
    if (numberOfCardsInHand === 5 && isRoyalFlush(cards)) return "Royal Flush";
    if (numberOfCardsInHand === 5 && isStraightFlush(cards)) return "Straight Flush";
    if (numberOfCardsInHand >= 4 && isFourOfAKind(cards)) return "Four of a Kind";
    if (numberOfCardsInHand === 5 && isFullHouse(cards)) return "Full House";
    if (numberOfCardsInHand === 5 && isFlush(cards)) return "Flush";
    if (numberOfCardsInHand === 5 && isStraight(cards)) return "Straight";
    if (numberOfCardsInHand >= 3 && isThreeOfAKind(cards)) return "Three of a Kind";
    if (numberOfCardsInHand >= 4 && isTwoPair(cards)) return "Two Pair";
    if (numberOfCardsInHand >= 2 && isOnePair(cards)) return "One Pair";
    return "High Card";
}
