// src/components/SupplementListItem.tsx
import React from 'react';
import { IonItem, IonLabel, IonCheckbox } from '@ionic/react';
import { Supplement } from '../data/Supplement';

interface SupplementListItemProps {
    supplement: Supplement;
    selected: boolean;
    onToggle: (supplementType: Supplement['type']) => void;
}

const SupplementListItem: React.FC<SupplementListItemProps> = ({ supplement, selected, onToggle }) => {
    return (
        <IonItem>
            <IonLabel>
                {supplement.type} {supplement.available ? `(+€${supplement.price.toFixed(2)})` : '(Indisponible)'}
            </IonLabel>
            <IonCheckbox
                slot="end"
                disabled={!supplement.available}
                checked={selected}
                onIonChange={() => onToggle(supplement.type)}
            />
        </IonItem>
    );
};

export default SupplementListItem;
