import { DbProduct } from "server/dbSchema";
export const IsPeanutFree = (product: DbProduct): boolean => {
  if (product.allergens.search("en:peanuts") !== -1) return false;
  return true;
};
