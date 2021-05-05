import { DbProduct } from "server/dbSchema";
import { glutenFood } from "../../constData/noGluten";

export const IsNoGluten = (product: DbProduct): boolean => {
  const ingredients = product.ingredients.split("|");
  return (
    product.labels.includes("no-gluten") ||
    (!(
      glutenFood.find((g) => product.name === g) ||
      glutenFood.find((g) => ingredients.find((i) => i.includes(g)))
    ) &&
      !product.allergens.includes("gluten"))
  );
};
