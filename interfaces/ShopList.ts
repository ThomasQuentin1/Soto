import { Product } from "typing";

export default interface ShopListProps {
    basket : Product[];
    cartQueryRefetch: any;
    setIsBasketUpToDate: any;
}