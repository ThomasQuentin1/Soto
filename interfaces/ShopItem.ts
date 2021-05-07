import { Product } from "typing";

interface ShopItemProps {
    key: number;
    product : Product;
    basket: Product[];
    setBasket: any;
    index: number;
}

export default ShopItemProps;
