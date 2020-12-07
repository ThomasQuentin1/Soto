import CountableProduct from 'interfaces/CountableProduct';

export default interface SearchBarProps {
    basket: CountableProduct[];
    setBasket: React.Dispatch<React.SetStateAction<CountableProduct[]>>;
  }