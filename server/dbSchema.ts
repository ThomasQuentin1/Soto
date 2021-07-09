export interface DbProduct {
  id: number;
  leclercId: string;
  photo: number;
  name: string;
  brand: string;
  priceUnit: string;
  priceMass: string;
  ingredients: string;
  packaging: string;
  allergens: string;
  nutriments: string;
  nutriscore: string;
  healthscore: number;
  environmentScore: number;
  priceScore: number;
  proximityScore: number;
  quantity: string;
  keywords: string;
  origin?: string;
  labels: string;
  ecoscore: number;
}

export interface DbUser {
  id: number;
  token: string;
  email: string;
  password: string;
  cartId: number;
  pushToken: string;
}
