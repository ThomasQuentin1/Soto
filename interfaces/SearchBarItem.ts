import { Product } from "typing";

export default interface SearchBarItemProps {
    product : Product;
    setOpen: any;
    AddToCart: any;
    basket: Product[];
    setBasket:any;
    cartQueryRefetch?: any;
    setIsBasketUpToDate?: any;
}