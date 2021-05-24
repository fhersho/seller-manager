import React, {useEffect, useState} from 'react';
import {OrderList} from "../../models/OrderList";
import {getOrders} from "../../services/SellerOrderServices";
import SellerOrderItem from "./SellerOrderItem";


const SellerOrderList = () => {

    const [orders, setOrders] = useState<OrderList[]>([]);

    const loadVideos = async () => {
        setOrders(await getOrders())
    }
    useEffect(() => {
        loadVideos()
    }, [])

    return (
        <div>
            {
                orders.map(order =>
                    <SellerOrderItem order={order}></SellerOrderItem>
                )
            }
        </div>
    )

}

export default SellerOrderList;
