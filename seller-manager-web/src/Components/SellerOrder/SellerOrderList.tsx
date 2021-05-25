import React, {useEffect, useState} from 'react';
import {OrderList} from "../../models/OrderList";
import {getOrders} from "../../services/SellerOrderServices";
import SellerOrderItem from "./SellerOrderItem";


const SellerOrderList = () => {

    const [orders, setOrders] = useState<OrderList[]>([]);

    const loadOrders = async () => {
        setOrders(await getOrders())
        console.log(orders);
    }
    useEffect(() => {
        loadOrders()
    }, [])

    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">Order number</th>
                <th scope="col">Product name</th>
                <th scope="col">Product qty</th>
                <th scope="col">Shipping method</th>
                <th scope="col">Options</th>
            </tr>
            </thead>
            <tbody>
            {
                orders.map(order =>
                    <SellerOrderItem order={order}></SellerOrderItem>
                )
            }
            </tbody>
        </table>

    )

}

export default SellerOrderList;
