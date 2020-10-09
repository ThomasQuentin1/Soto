import React from 'react';
import Grid from "@material-ui/core/Grid";
import ShopItemRow from 'components/shop/ShopItemRow';
import {Product } from 'interfaces/Product'

const SplitArray = (array: Product[]) : Product[][] => {
    let splittedArray : Product[][] = [];
    let tmpArray : Product[] = [];
    let counter = 0;

    array.forEach((product) => {
        if (counter === 3)
        {
            splittedArray.push(tmpArray);
            counter = 0;
            tmpArray = [];
        }
        tmpArray.push(product);
        counter++;
    });
    if (counter != 0) {
        splittedArray.push(tmpArray);
    }
    return splittedArray;
}

const ShopList = () => {
    // Hard product only for display testing, TO REMOVE WHEN FINISHED
    let products : Product[] = [{name: 'nicolas', brand: 'nicolas', description: 'nicolas', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'nicolas', ingredients: 'nicolas', manual: 'nicolas', numberOfProduct: 1, picture: 'nicolas', price: 1, productInformation: 'nicolas', quantity: 1, quantityType: 'nicolas', score: 100}, {name: 'nicolas', brand: 'nicolas', description: 'nicolas', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'nicolas', ingredients: 'nicolas', manual: 'nicolas', numberOfProduct: 1, picture: 'nicolas', price: 1, productInformation: 'nicolas', quantity: 1, quantityType: 'nicolas', score: 100}, {name: 'nicolas', brand: 'nicolas', description: 'nicolas', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'nicolas', ingredients: 'nicolas', manual: 'nicolas', numberOfProduct: 1, picture: 'nicolas', price: 1, productInformation: 'nicolas', quantity: 1, quantityType: 'nicolas', score: 100}, {name: 'nicolas', brand: 'nicolas', description: 'nicolas', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'nicolas', ingredients: 'nicolas', manual: 'nicolas', numberOfProduct: 1, picture: 'nicolas', price: 1, productInformation: 'nicolas', quantity: 1, quantityType: 'nicolas', score: 100}, {name: 'nicolas', brand: 'nicolas', description: 'nicolas', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'nicolas', ingredients: 'nicolas', manual: 'nicolas', numberOfProduct: 1, picture: 'nicolas', price: 1, productInformation: 'nicolas', quantity: 1, quantityType: 'nicolas', score: 100}, {name: 'nicolas', brand: 'nicolas', description: 'nicolas', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'nicolas', ingredients: 'nicolas', manual: 'nicolas', numberOfProduct: 1, picture: 'nicolas', price: 1, productInformation: 'nicolas', quantity: 1, quantityType: 'nicolas', score: 100}, {name: 'nicolas', brand: 'nicolas', description: 'nicolas', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'nicolas', ingredients: 'nicolas', manual: 'nicolas', numberOfProduct: 1, picture: 'nicolas', price: 1, productInformation: 'nicolas', quantity: 1, quantityType: 'nicolas', score: 100}, {name: 'nicolas', brand: 'nicolas', description: 'nicolas', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'nicolas', ingredients: 'nicolas', manual: 'nicolas', numberOfProduct: 1, picture: 'nicolas', price: 1, productInformation: 'nicolas', quantity: 1, quantityType: 'nicolas', score: 100}, {name: 'nicolas', brand: 'nicolas', description: 'nicolas', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'nicolas', ingredients: 'nicolas', manual: 'nicolas', numberOfProduct: 1, picture: 'nicolas', price: 1, productInformation: 'nicolas', quantity: 1, quantityType: 'nicolas', score: 100}, {name: 'nicolas', brand: 'nicolas', description: 'nicolas', energy: {carbohydrates: 1, fat: 1, kcal: 1, protein: 1, salt: 1}, geographicOrigin: 'nicolas', ingredients: 'nicolas', manual: 'nicolas', numberOfProduct: 1, picture: 'nicolas', price: 1, productInformation: 'nicolas', quantity: 1, quantityType: 'nicolas', score: 100}]
    let splittedProducts = SplitArray(products);
    return (
        <Grid container spacing={3}>
            {splittedProducts.map((productsRow, index) => {
                return (
                    <ShopItemRow key={index} products={productsRow}/>
                );
            })}
        </Grid>
    );
}

export default ShopList