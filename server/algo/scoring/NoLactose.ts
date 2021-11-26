import { DbProduct } from "server/dbSchema";

export const IsNoLactose = (product: DbProduct): boolean => {
  return (
      !product.allergens.includes("en:milk") && !product.allergens.includes("fr:lait") && !product.ingredients.includes("lait") && !product.ingredients.includes("milk")  && !product.ingredients.includes("lactose") 
  );
};
