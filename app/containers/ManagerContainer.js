import React, { Component } from 'react'
import { connect } from 'react-redux';
import Manager from "../components/Manager";
import Cart from "../components/Cart";
import Orders from "../components/Orders";
import {
    toggleSideBarButton,
    fetchContentIfNeeded,
    invalidateProducts,
    toggleStoreCreateButton, checkout, deleteOrder, selectProduct, updateCart
} from '../actions/manager';

import {
    logout
} from '../actions/auth';

import {
    Route,
    Link,
    NavLink,
    withRouter, Redirect
  } from 'react-router-dom'

class ManagerContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { fetchProducts, fetchCart } = this.props;
        fetchProducts();
        fetchCart();
    }

    render() {
        const { selectedStore, isFetching, products, selectProduct, cartItems, orderItems, checkout, fetchOrders, updateCart, deleteOrder, logoutSuccess, onLogoutSubmit, attemptingLogout} = this.props;

        if(logoutSuccess){
            window.location.href = '/login';
        }

        return (
            <div className="dashboard-container grid-container">
                <div className="main-nav-container">
                    <div className="main-nav-links">
                        <NavLink exact to='/' activeClassName='active-nav' className='nav-item'>Products</NavLink>
                        <NavLink to='/orders' activeClassName='active-nav' className='nav-item'>Order</NavLink>
                    </div>
                    <Link to="/"><img className = 'dashboard-main-logo' src="/img/logo_main.png"/></Link>
                    <div className = 'cart-nav-links'>
                        <NavLink to='/cart' activeClassName='active-nav' className='main-nav-links nav-item'>Cart {(cartItems.length != 0) ? (<div className="cart-count-badge">{cartItems.length}</div>) : null}</NavLink>
                        {  
                            attemptingLogout ? <b>Logging Out...</b> : <button className="logout-btn" onClick={e => onLogoutSubmit()}>LOG OUT</button>
                        }
                    </div>
                    
                </div>
                
                <div className="main-content-container">
                     <Route exact path='/' 
                        render={(props) => <Manager products={products} selectedStore={selectedStore} isFetching={isFetching} selectProduct={selectProduct}/>} 
                    />
                    <Route
                        path='/cart'
                        render={(props) => <Cart products={cartItems} checkout={checkout} updateCart={updateCart}/>}
                    />
                    <Route
                        path='/orders'
                        render={(props) => <Orders orders={orderItems} fetchOrders={fetchOrders} deleteOrder={deleteOrder}/>}
                    />
                </div>
                    
                
            </div>
        )
        
    }

}

function mapStateToProps(state) {
    const { selectedProduct : productID, products, isFetching } = state.products;
    const { products: items } = state.cart;
    let selectedProduct;
    if(productID)
        selectedProduct = products.find(e => e._id === productID);
    else
        selectedProduct = products[0];

    let cartItems = items.map(item => {
        let product = products.find(e => e._id === item._id);
        
        return { ...product, ...item };
    })
    
    return {
        selectedProduct,
        products,
        cartItems,
        isFetching,
        orderItems: state.orders.orders,
        logoutSuccess: state.auth.logoutSuccess,
        attemptingLogout: state.auth.attemptingLogout
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onButtonClick: barContent => {
            dispatch(toggleSideBarButton(barContent));
            dispatch(fetchContentIfNeeded(barContent));
        },
        fetchProducts: () => {
            dispatch(fetchContentIfNeeded('PRODUCTS'));
        },
        fetchCart: () => {
            dispatch(fetchContentIfNeeded('CART'));
        },
        fetchOrders: () => {
            dispatch(fetchContentIfNeeded('ORDERS'));
        },
        onCreateStoreFormToggle: state => {
            dispatch(toggleStoreCreateButton(state));
        },
        checkout: () => {
            dispatch(checkout());
        },
        updateCart: (products) => {
            dispatch(updateCart(products));
        },
        deleteOrder: order => {
            dispatch(deleteOrder(order))
        },
        selectProduct: product => {
            dispatch(selectProduct(product))
        },
        onLogoutSubmit: () => {
            dispatch(logout());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagerContainer))