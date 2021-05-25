import React, {Fragment, useState} from 'react';
import {ProductItem} from "../../models/ProductItem";
import {Button, Modal} from "react-bootstrap";

interface Props {
    callback: any
}

const NewProductItem = ({callback}: Props) => {
    const [show, setShow] = useState(false);
    const [product, setProduct] = useState<ProductItem>({
        name: '',
        qty: 0,
        weight: 0
    });

    const handleModal = () => setShow(!show);

    const handleCreateNewProduct = () => {
        callback(product);
        handleModal();
    }

    return (
        <Fragment>
            <Button variant="primary" onClick={handleModal}>
                Add product
            </Button>

            <Modal show={show} onHide={handleModal}>
                <Modal.Header>
                    <Modal.Title>Add product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="">
                        <div className="mb-3">
                            <input type="text" name="name" placeholder="Write a product name"
                                   className="form-control" autoFocus
                            onChange={e => setProduct({... product, name: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <input type="number" name="qty" placeholder="Write product quantity"
                                   className="form-control"
                                   onChange={e => setProduct({... product, qty: Number(e.target.value)})}/>
                        </div>
                        <div className="mb-3">
                            <input type="number" name="weight" placeholder="Write product weight"
                                   className="form-control"
                                   onChange={e => setProduct({... product, weight: Number(e.target.value)})}/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateNewProduct}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default NewProductItem;