// src/components/DrinkListItem.tsx
import React from 'react';
import { IonItem, IonLabel, IonRadio, IonRadioGroup } from '@ionic/react';
import { Drink } from '../data/Drink';

interface DrinkListItemProps {
    drink: Drink;
    selected: string;
    onSelect: (drinkType: Drink['type']) => void;
}

const DrinkListItem: React.FC<DrinkListItemProps> = ({ drink, selected, onSelect }) => {
    return (
        <IonRadioGroup value={selected} onIonChange={(e) => onSelect(e.detail.value)}>
            <IonItem>
                <IonLabel>
                    {drink.type} - €{drink.basePrice.toFixed(2)}
                </IonLabel>
                <IonRadio slot="end" value={drink.type} />
            </IonItem>
        </IonRadioGroup>
    );
};

export default DrinkListItem;
