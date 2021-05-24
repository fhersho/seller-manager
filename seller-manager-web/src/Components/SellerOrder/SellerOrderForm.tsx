import React, {Component, useEffect, useState} from 'react';
import {OrderForm} from "../../models/OrderForm";

const SellerOrderForm = () => {
    const [state, setState] = useState<OrderForm>({externalOrderNumber: ''});
    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <h3>New sell order</h3>
                        <form>
                            <div className="mb-3">
                                <input type="text" name="seller_store" id="seller_store"
                                       placeholder="Write a seller store"
                                       className="form-control" autoFocus/>
                            </div>
                            <div className="mb-3">
                                <select name="shipping_method" className="form-select"></select>
                            </div>
                            <div className="mb-3">
                                <input type="number" name="external_order_number"
                                       placeholder="Write a external order number"
                                       className="form-control"/>
                            </div>

                            <div className="mb-3">
                                <input type="text" name="buyer_full_name" placeholder="Write buyer full name"
                                       className="form-control"/>
                            </div>

                            <div className="mb-3">
                                <input type="number" name="buyer_phone_number" placeholder="Write buyer phone number"
                                       className="form-control"/>
                            </div>

                            <div className="mb-3">
                                <input type="email" name="buyer_email" placeholder="Write buyer email"
                                       className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <input type="text" name="shipping_country"
                                       placeholder="Write buyer shipping country"
                                       className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <input type="text" name="shipping_region"
                                       placeholder="Write buyer shipping region"
                                       className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <input type="text" name="shipping_city"
                                       placeholder="Write buyer shipping city"
                                       className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <input type="text" name="shipping_address"
                                       placeholder="Write buyer shipping address"
                                       className="form-control"/>
                            </div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product name</th>
                                    <th scope="col">Product qty</th>
                                    <th scope="col">Product weight</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                </tbody>
                            </table>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SellerOrderForm;