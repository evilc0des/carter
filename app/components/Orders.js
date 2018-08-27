import React, { Component } from 'react'
import { selectProduct } from '../actions/manager';

export default class Orders extends Component{
    constructor(props) {
        super(props);

        this.handleOrderDelete = this.handleOrderDelete.bind(this);
        this.handleProductAddFormSubmit = this.handleProductAddFormSubmit.bind(this);
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
                                <div className="product-card order-card">
                                    <div className="order-info">
                                        <p className="order-number">Order #{order._id}</p>
                                        <p className="order-qty">{order.products.length} ITEMS</p>
                                        <p className="order-total">Rs. {order.total}</p>
                                    </div>
                                    <p className="order-date">Purchased {this.getTimeString(order.createdDate)}</p>
                                    <button className="order-cancel-btn" onClick={e => this.handleOrderDelete(order._id)}>CANCEL ORDER</button>
                                </div>
                            </li>)
                    })}
                    
             </div>
         )
     }
}