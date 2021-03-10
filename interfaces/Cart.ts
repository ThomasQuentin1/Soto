import { Product } from 'typing.ts';
import { Shop } from 'interfaces/Shop';

export interface Cart {
    products: Product[];
    dateCreated: Date;
    dateLastEdit: Date;
    shop: Shop;
    price: number;
}