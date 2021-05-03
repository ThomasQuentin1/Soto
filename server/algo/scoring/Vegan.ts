import { DbProduct } from "server/dbSchema";
import { veganUnallowedFood } from "../../constData/vegan";

export const IsVegan = (product: DbProduct): boolean => {
  const ing = product.ingredients.split("|");
  const veganIng = !ing.find(
    (i) =>
      veganUnallowedFood.en.find((v) => i === v) ||
      veganUnallowedFood.fr.find((v) => i === v)
  );
  const veganTitle = !(
    veganUnallowedFood.en.find((v) => product.name === v) ||
    veganUnallowedFood.fr.find((v) => product.name === v)
  );

  return veganIng && veganTitle;
};
