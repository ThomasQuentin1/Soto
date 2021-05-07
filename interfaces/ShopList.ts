import { Product } from "typing";

export default interface ShopListProps {
    basket : Product[];
    setBasket : any;
    cartQuery: any;
}