import { Product } from "typing";

export default interface SearchBarItemProps {
    product : Product;
    setOpen: any;
    cartQueryRefetch: any;
    setIsBasketUpToDate: any;
}