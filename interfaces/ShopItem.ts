import { Product } from "typing";

interface ShopItemProps {
    key: number;
    product : Product;
    AddToCart: any;
    RemoveFromCart: any;
    basket : Product[];
    setBasket: any;
    cartQueryRefetch?: any;
    setIsBasketUpToDate?: any;
}

export default ShopItemProps;
