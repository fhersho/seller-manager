import React, {Component, useEffect} from 'react';
import {ProductItem} from "../../models/ProductItem";

interface Props {
    products: ProductItem[]
}

const TableProductItem = ({products}: Props) => {
    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Product name</th>
                <th scope="col">Product qty</th>
                <th scope="col">Product weight</th>
            </tr>
            </thead>
            <tbody>
            {products.map(p => (
                <tr>
                    <th scope="row">{p.id}</th>
                    <td>{p.name}</td>
                    <td>{p.qty}</td>
                    <td>{p.weight}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default TableProductItem;