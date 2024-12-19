// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import {
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar,
    IonButton,
    IonItem,
    IonLabel,
    IonText,
    IonSelect,
    IonSelectOption,
} from '@ionic/react';
import DrinkListItem from '../components/DrinkListItem';
import SupplementListItem from '../components/SupplementListItem';
import { Drink, drinks } from '../data/Drink';
import { Supplement, SupplementType, supplements as supplementData } from '../data/Supplement';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
    const history = useHistory();

    // État pour la sélection des boissons
    const [selectedDrink, setSelectedDrink] = useState<Drink['type'] | null>(null);

    // État pour la taille sélectionnée
    const [selectedSize, setSelectedSize] = useState<'Small' | 'Medium' | 'Large'>('Small');

    // État pour les suppléments sélectionnés
    const [selectedSupplements, setSelectedSupplements] = useState<SupplementType[]>([]);

    // État pour le total
    const [total, setTotal] = useState<number>(0);

    // Crédit disponible (valeur arbitraire)
    const credit = 4.70;

    // Calcul du total chaque fois que les sélections changent
    useEffect(() => {
        let drinkPrice = 0;

        // Trouver la boisson sélectionnée
        const drink = drinks.find(d => d.type === selectedDrink);
        if (drink) {
            // Calculer le prix en fonction de la taille
            switch (selectedSize) {
                case 'Small':
                    drinkPrice = drink.basePrice;
                    break;
                case 'Medium':
                    drinkPrice = drink.basePrice * 1.5; // Exemple de calcul
                    break;
                case 'Large':
                    drinkPrice = drink.basePrice * 2;
                    break;
                default:
                    drinkPrice = drink.basePrice;
            }
        }

        // Calculer le prix des suppléments
        let supplementsTotal = 0;
        selectedSupplements.forEach(suppType => {
            const supp = supplementData.find(s => s.type === suppType);
            if (supp && supp.available) {
                supplementsTotal += supp.price;
            }
        });

        // Calculer le total
        setTotal(drinkPrice + supplementsTotal);
    }, [selectedDrink, selectedSize, selectedSupplements]);

    // Gérer la sélection de la boisson
    const handleSelectDrink = (drinkType: Drink['type']) => {
        setSelectedDrink(drinkType);
        // Si la boisson sélectionnée est Chocolate, désactiver Sugar
        if (drinkType === 'Chocolate') {
            setSelectedSupplements(prev =>
                prev.filter(supp => supp !== 'Sugar')
            );
        }
    };

    // Gérer la sélection des suppléments
    const handleToggleSupplement = (suppType: SupplementType) => {
        setSelectedSupplements(prev => {
            if (prev.includes(suppType)) {
                return prev.filter(s => s !== suppType);
            } else {
                return [...prev, suppType];
            }
        });
    };

    // Gérer le rafraîchissement (pull-to-refresh)
    const refresh = (e: CustomEvent) => {
        setTimeout(() => {
            // Ici, vous pourriez recharger les données si nécessaire
            e.detail.complete();
        }, 2000);
    };

    // Gérer l'achat et la navigation vers la page de paiement
    const handleBuy = () => {
        history.push('/checkout', {
            selectedDrink,
            selectedSize,
            selectedSupplements,
            total,
        });
    };

    // Désactiver le bouton Acheter si aucun choix de boisson n'est fait ou si le total dépasse le crédit
    const isBuyDisabled = !selectedDrink || total > credit;

    return (
        <IonPage id="home-page">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Commande de Boissons</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent pullingIcon="arrow-down" pullingText="Tirez pour rafraîchir" refreshingSpinner="circles" refreshingText="Rafraîchissement..."></IonRefresherContent>
                </IonRefresher>

                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Commande de Boissons</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonList>
                    {/* Liste des Boissons */}
                    <IonText className="section-title">Sélectionnez votre boisson</IonText>
                    {drinks.map(drink => (
                        <DrinkListItem
                            key={drink.type}
                            drink={drink}
                            selected={selectedDrink || ''}
                            onSelect={handleSelectDrink}
                        />
                    ))}

                    {/* Sélecteur de Taille */}
                    <IonItem>
                        <IonLabel>Taille</IonLabel>
                        <IonSelect value={selectedSize} placeholder="Sélectionnez la taille" onIonChange={e => setSelectedSize(e.detail.value)}>
                            <IonSelectOption value="Small">Petite</IonSelectOption>
                            <IonSelectOption value="Medium">Moyenne</IonSelectOption>
                            <IonSelectOption value="Large">Grande</IonSelectOption>
                        </IonSelect>
                    </IonItem>

                    {/* Liste des Suppléments */}
                    <IonText className="section-title">Suppléments</IonText>
                    {supplementData.map(supplement => (
                        <SupplementListItem
                            key={supplement.type}
                            supplement={supplement}
                            selected={selectedSupplements.includes(supplement.type)}
                            onToggle={handleToggleSupplement}
                        />
                    ))}
                </IonList>

                {/* Affichage du Total */}
                <IonItem lines="none">
                    <IonLabel><strong>Total :</strong></IonLabel>
                    <IonText>
                        <strong>€{total.toFixed(2)}</strong>
                    </IonText>
                </IonItem>
                <IonItem lines="none">
                    <IonLabel><strong>Crédit Disponible :</strong></IonLabel>
                    <IonText>
                        <strong>€{credit.toFixed(2)}</strong>
                    </IonText>
                </IonItem>

                {/* Message d'alerte si le total dépasse le crédit */}
                {total > credit && (
                    <IonText color="danger">
                        <p>Le total dépasse le crédit disponible !</p>
                    </IonText>
                )}

                {/* Bouton Acheter */}
                <IonButton expand="block" onClick={handleBuy} disabled={isBuyDisabled}>
                    Acheter
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Home;
