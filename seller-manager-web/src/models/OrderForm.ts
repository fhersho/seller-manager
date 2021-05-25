import {ProductItem} from "./ProductItem";

export interface OrderForm {
    externalOrderNumber: string;
    sellerStore: string,
    shippingMethod: number;
    buyerFullName:string;
    buyerPhoneNumber: number;
    buyerEmail: string;
    shippingCountry: string;
    shippingRegion: string;
    shippingCity: string;
    shippingAddress: string;
    items: ProductItem[]
}