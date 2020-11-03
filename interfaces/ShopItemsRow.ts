import { Product } from './Product'

interface ShopItemRowProps {
    key: number;
    productsToDisplay: Product[];
    basket : Product[];
    setBasket : any;
}

export default ShopItemRowProps