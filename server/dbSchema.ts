export interface DbProduct {
  id: number;
  leclercId: string;
  photo: string;
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
  promotion: string;
}

export interface DbUser {
  id: number;
  email: string;
  password: string;
  cartId: number;
  pushToken: string;
}
