import React, { useState } from "react";
import HistoryShortCutItem from "../components/history/HistoryShortCutItem";
import { Cart } from 'interfaces/Cart';

const ContainHistoryItem = () => {
  const cart : Cart[] = [{shop: {name: 'Auchan', city: 'Strasbourg', long: 1, lat: 1, id:1, server:'null', code:'null'}, price: 55, dateCreated: new Date(), dateLastEdit: new Date(), products: [{name: 'Pain', brand: 'Bon matin', scoreHealth: 20, quantity: 1, price: 1}, {name: 'Soda', brand: 'Coca-cola', scoreHealth: 1, quantity: 2, price: 1}, {name: 'Pâtes', brand: 'Barilla', scoreHealth: 100, quantity: 25, price: 2}, {name: 'Sauce tomate', brand: 'Panzani', scoreHealth: 50, quantity: 1, price: 1}]}, {shop: {name: 'Leclerc', city: 'Strasbourg', long: 1, lat: 1, id:1, server:'null', code:'null'}, price: 55, dateCreated: new Date(), dateLastEdit: new Date(), products: [{name: 'Pain', brand: 'Bon matin', scoreHealth: 20, quantity: 1, price: 1}, {name: 'Soda', brand: 'Coca-cola', scoreHealth: 1, quantity: 2, price: 1}, {name: 'Pâtes', brand: 'Barilla', scoreHealth: 100, quantity: 25, price: 2}, {name: 'Sauce tomate', brand: 'Panzani', scoreHealth: 50, quantity: 1, price: 1}]}];
  const [basket, setBasket] = useState([]);
  return <HistoryShortCutItem cart={cart[0]} basket={basket} setBasket={setBasket}></HistoryShortCutItem>;
};

export default ContainHistoryItem;
