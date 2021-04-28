import { DbProduct } from "server/dbSchema";

export const IsNoGluten = (_product: DbProduct): boolean => {
  return Math.random() < 0.5;
};
