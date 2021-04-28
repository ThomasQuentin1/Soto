import { DbProduct } from "server/dbSchema";

export const IsVegan = (_product: DbProduct): boolean => {
  return Math.random() < 0.5;
};
