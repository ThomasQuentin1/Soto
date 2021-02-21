import CountableProduct from 'interfaces/CountableProduct';

interface ShopItemProps {
    key: number;
    countableProduct : CountableProduct;
    basket: CountableProduct[];
    setBasket: any;
    index: number;
}

export default ShopItemProps;
