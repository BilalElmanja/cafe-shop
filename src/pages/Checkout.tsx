// src/pages/Checkout.tsx
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
    IonContent,
    IonHeader,
    IonList,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
} from '@ionic/react';

interface LocationState {
    selectedDrink: string | null;
    selectedSize: 'Small' | 'Medium' | 'Large';
    selectedSupplements: string[];
    total: number;
}

const Checkout: React.FC = () => {
    const location = useLocation<LocationState>();
    const history = useHistory();

    const { selectedDrink, selectedSize, selectedSupplements, total } = location.state || {
        selectedDrink: null,
        selectedSize: 'Small',
        selectedSupplements: [],
        total: 0,
    };

    if (!selectedDrink) {
        // Si aucun boisson n'est sélectionnée, rediriger vers la page d'accueil
        history.replace('/home');
        return null;
    }

    // Fonction pour finaliser l'achat (par exemple, envoyer les données au serveur)
    const handleFinalizePurchase = () => {
        // Implémentez la logique de paiement ici
        // Par exemple, envoyer une requête POST à votre API
        alert('Achat finalisé !');
        history.push('/home');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Résumé de la Commande</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    <IonItem>
                        <IonLabel>
                            <strong>Boisson :</strong> {selectedDrink}
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            <strong>Taille :</strong> {selectedSize}
                        </IonLabel>
                    </IonItem>
                    {selectedSupplements.length > 0 && (
                        <IonItem>
                            <IonLabel>
                                <strong>Suppléments :</strong> {selectedSupplements.join(', ')}
                            </IonLabel>
                        </IonItem>
                    )}
                    <IonItem>
                        <IonLabel>
                            <strong>Total :</strong> €{total.toFixed(2)}
                        </IonLabel>
                    </IonItem>
                </IonList>

                <IonButton expand="block" onClick={handleFinalizePurchase}>
                    Finaliser l'Achat
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Checkout;
