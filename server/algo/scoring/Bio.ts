import { DbProduct } from "server/dbSchema";
import { bioTab } from "../../constData/bio";
export const IsBio = (product: DbProduct): boolean => {
  let ret = false;
  bioTab.forEach((e) => {
    if (product.labels.search(e) !== -1) {
      ret = true;
      return;
    }
  });
  return ret;
};
