import {useEffect, useState} from "react";
import {OrderList} from "../models/OrderList";
import {getOrders} from "../services/SellerOrderServices";

export const useOrderList = () => {
    const [orders, setOrders] = useState<OrderList[]>([])

    const loadOrders = async () => {
        setOrders(await getOrders())
    }
    useEffect(() => {
        loadOrders()
    }, [])

    return {orders, loadOrders}
}

