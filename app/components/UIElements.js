import React, { Component } from 'react'

export class Modal extends Component{
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {quantity: 1, variant: ""};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectVariant = this.selectVariant.bind(this);
    }
    
    handleChange(event) {
        let value = parseInt(event.target.value);
        
        if(value > this.props.product.stock){
            value = parseInt(this.props.product.stock);
        }
        else if(value < 1){
            value = 1;
        }

        this.setState({quantity: value});
    }
    handleSubmit(event) {
        //alert(`A name was submitted: ${this.state.email} with password ${this.state.pass}`);
        event.preventDefault();
        let variant = this.state.variant == "" ? this.props.product.variants[0] : this.state.variant;
        this.props.confirm("PRODUCT_DETAIL", this.props.product._id, this.state.quantity, variant);
        this.setState({quantity: 1, variant: ''});
    }

    clearState(){
        this.setState({quantity: 1, variant: ''});
    }

    selectVariant(variant) {
        this.setState({variant: variant});
    }

    incrementQuantity() {
        if(this.state.quantity < this.props.product.stock){
            this.setState({quantity: parseInt(this.state.quantity)+1});
        }
    }

    decrementQuantity() {
        if(this.state.quantity > 1){
            this.setState({quantity: parseInt(this.state.quantity)-1});
        }
    }

    render() {
        const { show, product, confirm, close } = this.props;

        if(show)
            return (
                <div className="modal">
                    <div className="modal-container">
                        <h1 className="product-name">{product.name.toUpperCase()}</h1>
                        
                        <h2 className="product-price">Rs. {product.price}</h2>
                        <p className="product-quantity">
                            <b className="product-quantity-label">QUANTITY</b>
                            <br/>
                            <span className="product-quantity-tuner" style={{ fontSize: "1.4em"}} 
                                onClick={e => this.decrementQuantity()}>-</span>
                            <input name="quantity" className="form-field product-quantity-field" type="number" value={this.state.quantity} onChange={this.handleChange} placeholder="Qty" />
                            <span className="product-quantity-tuner" 
                                onClick={e => this.incrementQuantity()}>+</span>
                        </p>
                        <h3 className="product-stock">OUT OF {product.stock}</h3>
                        {
                            (product.variants && product.variants.length !== 0) ?(
                                <ul className="product-variants">
                                    <p className="product-variants-label">AVAILABLE IN</p>
                                    {
                                        product.variants.map((variant, index) => {
                                            return (
                                                <li key={index} onClick={e => this.selectVariant(variant)} className={(this.state.variant == variant || (index == 0 && this.state.variant == "")) ? "selected-variant":""}>
                                                    <b>{variant}</b>
                                                </li>)
                                        })
                                    }
                                </ul>
                            ): null
                             
                        }
                        <div className="confirm-container">
                            <span className="subtotal-label">SUBTOTAL</span>
                            <span className="currency-label">Rs.</span>
                            <span className="subtotal-value">{ Math.round(product.price * this.state.quantity * 100)/100 }</span>
                            <button className="confirm-btn" onClick={this.handleSubmit}>ADD TO CART</button>
                        </div>
                        <button className="cancel-btn" onClick={e => { this.clearState(); close("PRODUCT_DETAIL");}}>X</button>
                    </div>
                </div>
            )
        else
            return null;
    }
}