import React, {Component, useEffect} from 'react';
import {OrderList} from "../../models/OrderList";
interface Props {
    order: OrderList
}
const SellerOrderItem = ({order}: Props) => {
    return (
        <div>
            <h1>{order.externalOrderNumber}</h1>
        </div>
    );

}

export default SellerOrderItem;