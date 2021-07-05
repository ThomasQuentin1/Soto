import { Product } from "typing";

export default interface PriceBannerProps {
    basket: Product[];
    cartQueryRefetch?: any;
    setIsBasketUpToDate?: any;
}