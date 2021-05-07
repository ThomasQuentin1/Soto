import { Product } from "typing";

export default interface SearchWrapperProps {
    basket: Product[];
    setBasket: React.Dispatch<React.SetStateAction<Product[]>>;
  }