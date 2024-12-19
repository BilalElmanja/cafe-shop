// src/models/Drink.ts
export type DrinkType = 'Coffee' | 'Tea' | 'Chocolate';
export type Size = 'Small' | 'Medium' | 'Large';

export interface Drink {
    type: DrinkType;
    basePrice: number;
}

export const drinks: Drink[] = [
    { type: 'Coffee', basePrice: 2 },
    { type: 'Tea', basePrice: 2 },
    { type: 'Chocolate', basePrice: 2.5 },
];
