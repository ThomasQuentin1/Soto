export interface Energy {
    kcal: number;
    fat: number;
    carbohydrates: number;
    protein: number;
    salt: number;
}

export interface Product {
    name: string;
    price: number;
    quantity: number;
    quantityType: string;
    description: string;
    geographicOrigin: string;
    manual: string;
    ingredients: string;
    productInformation: string;
    energy: Energy;
    picture: string;
    score: number;
    brand: string;
    numberOfProduct: number;
}