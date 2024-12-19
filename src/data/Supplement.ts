// src/models/Supplement.ts
export type SupplementType = 'Sugar' | 'Cream' | 'Whipped Cream';

export interface Supplement {
    type: SupplementType;
    price: number;
    available: boolean; // Indique si le supplément est disponible
}

export const supplements: Supplement[] = [
    { type: 'Sugar', price: 0, available: true },
    { type: 'Cream', price: 1.50, available: true },
    { type: 'Whipped Cream', price: 1.50, available: true },
];
