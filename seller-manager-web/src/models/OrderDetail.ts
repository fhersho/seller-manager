import {ProductItem} from "./ProductItem";

export interface OrderDetail {
    internalOrderNumber?: string;
    sellerStore?: string;
    shippingMethod?: number;
    externalOrderNumber?: string;
    buyerFullName?: string;
    buyerPhoneNumber?: number;
    buyerEmail?: string;
    shippingAddress?: string;
    shippingCity?: string;
    shippingRegion?: string;
    shippingCountry?: string;
    items?: ProductItem[];
    creationDate?: string;
    packPromiseMin?: number;
    packPromiseMax?: number;
    shipPromiseMin?: number;
    shipPromiseMax?: number;
    deliveryPromiseMin?: number;
    deliveryPromiseMax?: number;
    readyPickupPromiseMin?: number;
    readyPickupPromiseMax?: number;
}
