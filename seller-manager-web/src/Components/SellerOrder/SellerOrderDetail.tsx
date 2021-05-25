import React, {Fragment, useEffect, useState} from 'react';
import {OrderList} from "../../models/OrderList";
import {getOrder, getOrders} from "../../services/SellerOrderServices";
import SellerOrderItem from "./SellerOrderItem";
import {ProductItem} from "../../models/ProductItem";
import {OrderDetail} from "../../models/OrderDetail";
import TableProductItem from "./TableProductItem";
import {Button, Modal} from "react-bootstrap";

interface Props {
    id: string
}

const SellerOrderDetail = ({id}: Props) => {
    const [show, setShow] = useState(false);
    const [order, setOrder] = useState<OrderDetail>({});

    const loadOrder = async () => {
        setOrder(await getOrder(id))
    }
    useEffect(() => {
        loadOrder()
    }, [])

    const handleModal = () => setShow(!show);

    return (
        <Fragment>
            <Button variant="primary" onClick={handleModal}>
                View
            </Button>

            <Modal show={show} onHide={handleModal}>
                <Modal.Header>
                    <Modal.Title>View order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>
                            Order information
                            <ul>
                                <li>{order.externalOrderNumber}</li>
                                <li>{order.buyerFullName}</li>
                                <li>{order.buyerPhoneNumber}</li>
                                <li>{order.buyerEmail}</li>
                            </ul>
                        </li>
                        <li>
                            Shipping info
                            <ul>
                                <li>{order.shippingAddress}</li>
                                <li>{order.shippingCity}</li>
                                <li>{order.shippingRegion}</li>
                                <li>{order.shippingCountry}</li>
                            </ul>
                        </li>
                        <li>
                            Promise dates
                            <ul>
                                <li>{order.packPromiseMin}</li>
                                <li>{order.packPromiseMax}</li>
                                <li>{order.shipPromiseMin}</li>
                                <li>{order.shipPromiseMax}</li>
                                <li>{order.deliveryPromiseMin}</li>
                                <li>{order.deliveryPromiseMax}</li>
                                <li>{order.readyPickupPromiseMin}</li>
                                <li>{order.readyPickupPromiseMax}</li>
                            </ul>
                        </li>
                        <li>
                            Line items
                            <TableProductItem products={order.items ? order.items : []}></TableProductItem>
                        </li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )

}

export default SellerOrderDetail;
