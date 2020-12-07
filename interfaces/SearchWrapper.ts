import CountableProduct from 'interfaces/CountableProduct';

export default interface SearchWrapperProps {
    basket: CountableProduct[];
    setBasket: React.Dispatch<React.SetStateAction<CountableProduct[]>>;
  }