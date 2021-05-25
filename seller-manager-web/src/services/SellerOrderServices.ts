import axios from "axios";
import {OrderForm} from "../models/OrderForm";
import config from "../shared/config";


const getShippingMethods = async () => {
    const res = await axios.get(`${config.URL_API}/shipping-methods`)
    return res.data
}

const saveOrder = async (data: OrderForm) => {
    await axios.post(`${config.URL_API}/sell-orders`, data);
}

const getOrders = async () => {
    const res = await axios.get(`${config.URL_API}/sell-orders`)
    return res.data
}

const getOrder = async (id: string) => {
    const res = await axios.get(`${config.URL_API}/sell-orders/${id}`)
    return res.data
}

export {getShippingMethods, saveOrder, getOrders, getOrder}