import React, { Component } from 'react'
import { selectProduct } from '../actions/manager';

export default class Orders extends Component{
    constructor(props) {
        super(props);

        this.state={

        }

        this.handleOrderDelete = this.handleOrderDelete.bind(this);
        this.handleOrderDetails = this.handleOrderDetails.bind(this);
    }

    handleOrderDetails(order, products) {
        if(!this.state[order]){

            this.setState({[order] : {
                show: true,
                products: products.map((p) => {
                    return {
                        ...this.props.products.find(e => e._id === p.product),
                        qty: p.quantity,
                        variant: p.variant
                    }
                })
            }});
               
        } else {
            this.setState({[order] : {
                ...this.state[order],
                show: !this.state[order].show
            }})
        }
        
    }

    handleOrderDelete(order) {
        swal({
            title: "Are you Sure?",
            text: "Your Order will be cancelled and refund will be initiated.",
            icon: "warning",
            buttons: ["No", "Yes"],
            dangerMode: true,
          })
          .then((done) => {
            if (done) {
              this.props.deleteOrder(order);
            }
        });
    }

    handleProductAddFormSubmit(event) {
        event.preventDefault();

        //if(this.state.createStoreName)
         //   this.props.createStore(this.state.createStoreName);
    }

    getTimeString(timestamp){
        var a = new Date(timestamp);
        var now = Date.now();

        if(now - timestamp < 60*1000)		return "Just Now"
        if(now - timestamp < 60*60*1000)		return parseInt((now - timestamp)/(1000*60))+" Minutes Ago";
        if(now - timestamp < 24*60*60*1000)		return parseInt((now - timestamp)/(60*60*1000))+" Hours Ago";
        if(now - timestamp < 2*24*60*60*1000)
            return "Yesterday";
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = `${date} ${month} ${year}` ;  
        return `on ${time}`;
    }

    componentDidMount() {
        const { fetchOrders } = this.props;
        fetchOrders();
    }

    render() {
        const { orders } = this.props;
        return (

            <div className="cart-details">
                    <h1>Your Orders</h1>
                    <p className="cart-count-label">You have {orders.length} active orders.</p>
                    
                    {orders.map(order => {
                        return (
                            <li key={order._id}>
                                <div className="product-card">
                                    <div className="order-card">
                                        <div className="order-info">
                                            <p className="order-number">Order #{order._id}</p>
                                            <p className="order-qty">{order.products.reduce((a, p) => a + parseInt(p.quantity), 0)} ITEMS</p>
                                            <p className="order-total">Rs. {order.total}</p>
                                        </div>
                                        <p className="order-date">Purchased {this.getTimeString(order.createdDate)}</p>
                                        <button className="order-details-btn" onClick={e => this.handleOrderDetails(order._id, order.products)}>ORDER DETAILS</button>
                                        <button className="order-cancel-btn" onClick={e => this.handleOrderDelete(order._id)}>CANCEL ORDER</button>
                                    </div>
                                    {
                                        (this.state[order._id] && this.state[order._id].show) ?
                                        <div className="order-details-card">
                                            <h3>Order Details</h3>
                                            {
                                                this.state[order._id].products.map(product => {
                                                    return (
                                                        <li className="order-detail-product-card" key={product._id}>
                                                            <div className="order-info">
                                                                <p className="product-name">{product.name}</p>
                                                                <p className="product-price">Rs. {product.price}</p>
                                                                { product.variant ? <p className="product-variant"><b>VARIANT:</b> {product.variant}</p> : null }
                                                            </div>
                                                            <p className="product-qty">QUANTITY: {product.qty}</p>
                                                            <p className="product-subtotal"><b>Rs.</b> <span className="product-subtotal-value">{product.qty * product.price}</span></p>
                                                        </li>
                                                        
                                                    )
                                                })
                                            }
                                        </div> : null
                                    }
                                    
                                </div>
                            </li>)
                    })}
                    
             </div>
         )
     }
}