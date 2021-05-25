import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import {OrderForm} from "../../models/OrderForm";
import TableProductItem from "./TableProductItem";
import NewProductItem from "./NewProductItem";
import {ProductItem} from "../../models/ProductItem";
import {getShippingMethods, saveOrder} from "../../services/SellerOrderServices";
import {ShippingMethod} from "../../models/ShippingMethod";
import {Button} from "react-bootstrap";

const SellerOrderForm = () => {
    const history = useHistory();
    const [shippingMethods, setShippingMethods,] = useState<ShippingMethod[]>([]);
    const [order, setOrder] = useState<OrderForm>({
        externalOrderNumber: '',
        sellerStore: '',
        shippingMethod: 0,
        buyerFullName: '',
        buyerPhoneNumber: 0,
        buyerEmail: '',
        shippingCountry: '',
        shippingRegion: '',
        shippingCity: '',
        shippingAddress: '',
        items: []
    });
    const addProductItem = (productItem: ProductItem) => {
        setOrder({...order, items: [...order.items, {...productItem, id: order.items.length + 1}]});
    }

    const loadShippingMethods = async () => {
        setShippingMethods(await getShippingMethods())
    }
    useEffect(() => {
        loadShippingMethods()
    }, [])

    const save = async () => {
        await saveOrder(order);
        history.push(`/`);
    }

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <h3>New sell order</h3>
                        <form>
                            <div className="mb-3">
                                <input type="text" name="sellerStore"
                                       placeholder="Write a seller store"
                                       onChange={e => setOrder({...order, sellerStore: e.target.value})}
                                       className="form-control" autoFocus/>
                            </div>
                            <div className="mb-3">
                                <select name="shipping_method" className="form-select"
                                        onChange={e => setOrder({...order, shippingMethod: Number(e.target.value)})}>
                                    <option value="0">Select one</option>
                                    {
                                        shippingMethods.map(s => (
                                            <option value={s.id}>{s.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <input type="number" name="external_order_number"
                                       placeholder="Write a external order number"
                                       onChange={e => setOrder({...order, externalOrderNumber: e.target.value})}
                                       className="form-control"/>
                            </div>

                            <div className="mb-3">
                                <input type="text" name="buyer_full_name" placeholder="Write buyer full name"
                                       onChange={e => setOrder({...order, buyerFullName: e.target.value})}
                                       className="form-control"/>
                            </div>

                            <div className="mb-3">
                                <input type="number" name="buyer_phone_number" placeholder="Write buyer phone number"
                                       onChange={e => setOrder({...order, buyerPhoneNumber: Number(e.target.value)})}
                                       className="form-control"/>
                            </div>

                            <div className="mb-3">
                                <input type="mail" name="buyer_email" placeholder="Write buyer email"
                                       onChange={e => setOrder({...order, buyerEmail: e.target.value})}
                                       className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <input type="text" name="shipping_country"
                                       onChange={e => setOrder({...order, shippingCountry: e.target.value})}
                                       placeholder="Write buyer shipping country"
                                       className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <input type="text" name="shipping_region"
                                       onChange={e => setOrder({...order, shippingRegion: e.target.value})}
                                       placeholder="Write buyer shipping region"
                                       className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <input type="text" name="shipping_city"
                                       onChange={e => setOrder({...order, shippingCity: e.target.value})}
                                       placeholder="Write buyer shipping city"
                                       className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <input type="text" name="shipping_address"
                                       onChange={e => setOrder({...order, shippingAddress: e.target.value})}
                                       placeholder="Write buyer shipping address"
                                       className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <NewProductItem callback={addProductItem}></NewProductItem>
                            </div>
                            <div className="mb-3">
                                <TableProductItem products={order.items}></TableProductItem>
                            </div>
                            <div className="mb-3">
                                <Button variant="primary" onClick={save}>
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SellerOrderForm;