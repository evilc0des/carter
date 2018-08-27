import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Modal } from "../components/UIElements";
import {closeModal, confirmModal} from "../actions/manager";

class UIContainer extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { isModalOpen, selectedProduct, onModalClose, onModalConfirm } = this.props;
        console.log(isModalOpen);
        return (
            <div className="ui-container">
                <Modal show={isModalOpen} product={selectedProduct} close={onModalClose} confirm={onModalConfirm}/>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onModalClose: modalContent => {
            dispatch(closeModal(modalContent));
        },
        onModalConfirm: (modalContent, productId, qty, variant) => {
            dispatch(confirmModal(modalContent, productId, qty, variant));
        }
    }
}

function mapStateToProps(state) {
    const { isOpen: isModalOpen, product: productID } = state.uiState;
    const {products} = state.products;
    //console.log(state.uiState);
    let selectedProduct;
    if(productID)
        selectedProduct = products.find(e => e._id === productID);
    else
        selectedProduct = products[0];
    return {
        isModalOpen,
        selectedProduct
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UIContainer)