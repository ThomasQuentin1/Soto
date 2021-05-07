import { Product } from "typing";

export default interface SearchBarItemProps {
    product : Product;
    basket: Product[];
    setBasket: any;
    setOpen: any;
}