import { DbProduct } from "server/dbSchema";

const notAllowed = [
  "cacahuète",
  "peanut",
  "pistache",
  "cajou",
  "noix",
  "arachide",
];

export const IsPeanutFree = (product: DbProduct): boolean => {
  if (product.allergens.search("en:peanuts") !== -1) return false;
  if (notAllowed.find((n) => product.ingredients.toLowerCase().includes(n)))
    return false;
  if (notAllowed.find((n) => product.name.toLowerCase().includes(n)))
    return false;
  return true;
};
