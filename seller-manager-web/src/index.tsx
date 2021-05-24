import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SellerOrderList from "./Components/SellerOrder/SellerOrderList";
import SellerOrderForm from "./Components/SellerOrder/SellerOrderForm";
import 'bootswatch/dist/pulse/bootstrap.min.css'
import './index.css';
import NavBar from "./Components/Navbar/Navbar";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <NavBar></NavBar>
        <div className="container p-4">
            <Switch>
                <Route exact path="/" component={SellerOrderList}/>
                <Route path="/new-order" component={SellerOrderForm}/>
            </Switch>
        </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
