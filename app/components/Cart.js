import React, { Component } from 'react'
import { selectProduct } from '../actions/manager';
import swal from 'sweetalert';
import {
    Link
  } from 'react-router-dom'

export default class Cart extends Component{
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleCheckout() {
        let updated = false;
        this.props.products.map(product => {
            if(this[product._id + product.variant].value != product.qty){
                updated = true;
                return {...product, qty: this[product._id + product.variant].value}
            }
            else return product;
        });

        if(updated){
            swal({
                title: "Some Products are updated!",
                text: "You might want to update your cart before checking out",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((done) => {
                if (done) {
                  this.props.checkout();
                }
            });
        } else {
            this.props.checkout();
        }
        
    }

    handleSubmit() {
        let updated = false;
        let products = this.props.products.map(product => {
            if(this[product._id + product.variant].value != product.qty){
                updated = true;
                return {...product, qty: this[product._id + product.variant].value}
            }
            else return product;
        });

        if(updated)
            this.props.updateCart(products);
    }

    handleBlur(event, product) {
        event.preventDefault();

        if(!event.target.value){
            this[product._id + product.variant].value = product.qty;
            this.setState({[product._id + product.variant] : product.qty});
        }
            
        //if(this.state.createStoreName)
         //   this.props.createStore(this.state.createStoreName);
        //product.price * (this[product._id + product.variant] ? this[product._id + product.variant].value : product.quantity)
        }

    handleChange(event, product) {
        let value = parseInt(event.target.value);
        
        if(value > product.stock){
            value = parseInt(product.stock);
        }
        else if(value < 1){
            value = 1;
        }
        this[product._id + product.variant].value = value;
        this.setState({[product._id + product.variant] : value});
    }

    render() {
        const { products } = this.props;
        return (
             <div className="cart-details">
                    <h1>Your Cart</h1>
                    <p className="cart-count-label">You have {products.length} items in your cart</p>
                    {products.map(product => {
                        //this.handleChange(product.qty, product._id)
                        return (
                            <li key={product._id + product.variant} onClick={ e => selectProduct(product._id)}>
                                <div className="product-card cart-card">
                                    <img src={product.photo}/>
                                    <p className="product-name">{product.name}</p>
                                    <p className="product-variant">{product.variant}</p>
                                    <p className="product-quantity">
                                        <span className="product-quantity-label">Qty.</span>  
                                        <input name="quantity" className="form-field product-quantity-field" type="number" defaultValue={product.qty} ref={(input) => this[product._id + product.variant] = input} onChange={e => this.handleChange(e, product)} onBlur={e => this.handleBlur(e, product)} placeholder="Qty" />
                                    </p>    
                                    <p className="product-subtotal">Rs. <span className="product-subtotal-value">{product.price * (this.state[product._id + product.variant] ? this.state[product._id + product.variant] : product.qty)}</span></p>
                                </div> 
                            </li>)
                    })}
                    {
                        products.length > 0 ? (<div className="confirm-container">
                            <p className="confirm-subtotal-label">ORDER SUBTOTAL</p>
                            <p className="confirm-subtotal-value">Rs. <span>{products.reduce((a, product)=>{
                                return a + product.price * (this.state[product._id + product.variant] ? this.state[product._id + product.variant] : product.qty);
                            }, 0)}</span></p>
                            <button className="update-btn" onClick={e => this.handleSubmit()}>UPDATE CART</button>
                            <button className="checkout-btn" onClick={e => this.handleCheckout()}>CHECKOUT</button>
                        </div>): (
                            <div className="empty-cart-container">
                                <img src="/img/shopping-cart-sign.png"/>
                                <h1>Your Cart is Empty!</h1>
                                <p>Looks like you have some shopping to do.</p>
                                <Link className="back-shopping-btn" to="/">GO BACK TO SHOPPING</Link>
                            </div>
                        )
                    }
             </div>
         )
     }
}