import { Product } from "typing";

interface ShopItemProps {
    key: number;
    product : Product;
    cartQueryRefetch: any;
    setIsBasketUpToDate: any;
}

export default ShopItemProps;
