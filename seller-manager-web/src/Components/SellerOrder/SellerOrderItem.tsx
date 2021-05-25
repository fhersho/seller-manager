import React, {Component, useEffect} from 'react';
import {OrderList} from "../../models/OrderList";
import SellerOrderDetail from "./SellerOrderDetail";
interface Props {
    order: OrderList
}
const SellerOrderItem = ({order}: Props) => {
    return (
        <tr>
            <th scope="row">{order.externalOrderNumber}</th>
            <td>{order.sellerStore}</td>
            <td>{order.creationDate}</td>
            <td>{order.shippingMethod}</td>
            <dt>
                <SellerOrderDetail id={order.externalOrderNumber}></SellerOrderDetail>
            </dt>
        </tr>
    );

}

export default SellerOrderItem;