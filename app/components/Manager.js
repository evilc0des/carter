import React, { Component } from 'react'
import { selectProduct } from '../actions/manager';

export default class Manager extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };

        this.handleProductAddFormChange = this.handleProductAddFormChange.bind(this);
        this.handleProductAddFormSubmit = this.handleProductAddFormSubmit.bind(this);
    }

    handleProductAddFormChange(event) {
        this.setState({name: event.target.value});
    }

    handleProductAddFormSubmit(event) {
        event.preventDefault();

        //if(this.state.createStoreName)
         //   this.props.createStore(this.state.createStoreName);
    }
    render() {
        const { selectedStore, isFetching, products, selectProduct } = this.props;
        return (

            <div className="product-list">
                    {products.map(product => {
                        return (
                            <li key={product._id} onClick={ e => selectProduct(product._id)}>
                                <div className="product-card">
                                    <div className="product-img" style={{ backgroundImage: `url(${product.photo ? product.photo : "/img/default_product.jpg" })`}}/>
                                    <div className="product-details">
                                        <h1 className="product-name left-aligned">{product.name}</h1>
                                        <p className="product-description left-aligned">{product.description}</p>
                                        {
                                            (product.variants && product.variants.length != 0) ?
                                            (<p className="product-variants left-aligned"><b>AVAILABLE IN:</b> {product.variants.join(", ")}</p>) :
                                            null
                                        }
                                        <p className="product-price">Rs. <span className="display-text">{(Math.round(product.price*100))/100}</span></p>
                                    <p className="product-stock">{(product.stock > 0) ? (<span>{product.stock} IN STOCK</span>) : <span>OUT OF STOCK</span>}</p>
                                    </div>
                                </div>
                            </li>)
                    })}
            </div>
         )
     }
}