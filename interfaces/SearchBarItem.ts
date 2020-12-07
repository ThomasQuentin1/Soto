import CountableProduct from 'interfaces/CountableProduct';

export default interface SearchBarItemProps {
    countableProduct : CountableProduct;
    basket: CountableProduct[];
    setBasket: any;
}