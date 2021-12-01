import React from "react";
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";
import Header from "components/global/Header";
import Footer from "components/global/Footer";
import '../i18n';
import PaymentContainer from "components/payment/PaymentContainer";
import { Cart } from "typing";

const PaymentPage = () => {
    const cart: Cart = { shop: { name: 'Auchan', city: 'Strasbourg', long: 1, lat: 1, id: 1, server: 'null', code: 'null' }, price: 55, dateCreated: new Date(), dateLastEdit: new Date(), products: [{ name: 'Pain', brand: 'Bon matin', scoreHealth: 20, itemQuantity: 1, priceUnit: "1", id: "1", photo: "", url: "" }, { name: 'Soda', brand: 'Coca-cola', scoreHealth: 1, itemQuantity: 2, priceUnit: "1", id: "1", photo: "", url: "" }, { name: 'Pâtes', brand: 'Barilla', scoreHealth: 100, itemQuantity: 25, priceUnit: "2", id: "1", photo: "", url: "" }, { name: 'Sauce tomate', brand: 'Panzani', scoreHealth: 50, itemQuantity: 1, priceUnit: "1", id: "1", photo: "", url: "" }] };

    const [theme, SetTheme] = useDarkMode();
    const usedTheme: string = theme.toString();
    let lng: string | null = 'fr';
    if (typeof window !== 'undefined') {
        lng = localStorage.getItem('lng');
        if (lng == null) {
            localStorage.setItem('lng', 'fr');
        }
    }

    return (
        <div>
            <DarkModeParent theme={usedTheme}>
                <title>
                    Paiement
                </title>
                <Header {...{ theme, SetTheme }} />
                <PaymentContainer cart={cart} loading={false} />
                <Footer />
            </DarkModeParent>
        </div>
    );
}

export default PaymentPage;
