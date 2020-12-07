import CountableProduct from 'interfaces/CountableProduct';

export default interface ShopListProps {
    basket : CountableProduct[];
    setBasket : any;
}