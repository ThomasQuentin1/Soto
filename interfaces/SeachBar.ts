import { Product } from "typing";

export default interface SearchBarProps {
    basket: Product[];
    setBasket: React.Dispatch<React.SetStateAction<Product[]>>;
    cartQuery: any;
  }