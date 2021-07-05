import { Product } from "typing";

export default interface ShopListProps {
    AddToCart: any;
    basket : Product[];
    setBasket: any;
    RemoveFromCart: any;
    cartQueryRefetch?: any;
    setIsBasketUpToDate?: any;
}