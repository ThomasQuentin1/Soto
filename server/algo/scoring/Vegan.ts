import { DbProduct } from "server/dbSchema";
import { veganUnallowedFood } from "../../constData/vegan";

export const IsVegan = (product: DbProduct): boolean => {
  const ing = product.ingredients.split("|");
  return !ing.find(
    (i) =>
      veganUnallowedFood.en.find((v) => i.includes(v)) ||
      veganUnallowedFood.fr.find((v) => i.includes(v))
  );
};
