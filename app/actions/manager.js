import axios from 'axios';

export function toggleSideBarButton(button) {
    return {
        type: 'TOGGLE_SIDEBAR_BUTTON',
        button
    }
}

export function toggleStoreCreateButton(state) {
    return {
        type: 'TOGGLE_STORE_CREATE_FORM',
        state: state
    }
}

export function invalidateProducts() {
    return {
        type: 'INVALIDATE_PRODUCTS'
    }
}


function requestProducts() {
    return {
        type: 'REQUEST_PRODUCTS'
    }
}

export function requestStoreDetail() {
    return {
        type: 'REQUEST_STORE_DETAILS'
    }
}

function receiveProducts(json) {
    return {
        type: 'RECEIVE_PRODUCTS',
        products: json.data.s === 'p' ? json.data.products : [],
        receivedAt: Date.now()
    }
}

function checkingOut() {
    return {
        type: 'CHECKING_OUT'
    }
}

function checkedOut(json) {
    return {
        type: 'ORDER_CREATED',
        order: json.data.d,
        receivedAt: Date.now()
    }
}

function checkOutFailed() {
    return {
        type: 'ORDER_FAILED',
        receivedAt: Date.now()
    }
}

function fetchProducts() {
    return dispatch => {
        dispatch(requestProducts());
        return axios.get(`/products/list`)
            .then(json => dispatch(receiveProducts(json)))
    }
}

function shouldFetchProducts(state) {
    const productState = state.products;

    if (!productState.products || productState.products.length === 0) {
        return true;
    } else if (productState.isFetching) {
        return false;
    } else {
        return productState.didInvalidate;
    }
}

export function checkout() {
    return (dispatch, getState) => {
        const products = getState().cart.products;
        dispatch(checkingOut());
        const postData = {
            items: products
        };
        return axios.post(`/orders/create`, postData)
            .then(json => json.data.s == 'p' ? dispatch(checkedOut(json)) : dispatch(checkOutFailed()))
    }
}



export function openDetailModal(productId) {
    return {
        type: 'OPEN_PRODUCT_DETAIL_MODAL',
        product: productId
    }
}

function addingToCart() {
    return {
        type: 'ADDING_TO_CART'
    }
}

function failedAddingToCart() {
    return {
        type: 'FAILED_ADDING_TO_CART'
    }
}

function updatingCart() {
    return {
        type: 'UPDATING_CART'
    }
}

function cartUpdateFailed() {
    return {
        type: 'FAILED_UPDATING_CART'
    }
}

function addedToCart(data) {
    return {
        type: 'ADDED_TO_CART',
        product: data.product,
        qty: data.qty,
        variant: data.variant,
        receivedAt: Date.now()
    }
}

function addToCart(product, qty, variant) {
    return (dispatch, getState) => {
        //const store = getState().storeState.storeToDelete;
        dispatch(addingToCart());
        const postData = {
            product: product,
            qty: qty,
            variant: variant
        };
        return axios.post(`/cart/add`, postData)
            .then(json => json.data.s == 'p' ? 
            dispatch(addedToCart(postData)) : 
            dispatch(failedAddingToCart()))
    }
}

export function updateCart(products) {
    return (dispatch, getState) => {
        //const products = getState().cart.products;
        dispatch(updatingCart());
        const postData = {
            products: products
        };
        return axios.post(`/cart/update`, postData)
            .then(json => json.data.s == 'p' ? dispatch(receiveCart(json)) : dispatch(cartUpdateFailed()))
    }
}

export function confirmModal( content, product, qty, variant ) {
    return (dispatch) => {
        switch(content) {
            case 'PRODUCT_DETAIL':
                dispatch(addToCart(product, qty, variant));
                break;
        }

        return dispatch({
            type: 'CONFIRM_MODAL'
        });
    }
}

export function closeModal( content ) {
    return (dispatch) => {
        switch(content) {
            case 'PRODUCT_DETAIL':
                dispatch(cancelAddToCart());
                break;
        }

        return dispatch({
            type: 'CLOSE_MODAL'
        });
    }
}

function cancelAddToCart() {
    return {
        type: 'CANCEL_ADD_TO_CART'
    }
}

export function fetchContentIfNeeded(contentType) {
    return (dispatch, getState) => {
        switch(contentType) {
            case 'PRODUCTS':
                if (shouldFetchProducts(getState())) {
                    return dispatch(fetchProducts());
                }

            case 'CART':
                if (shouldFetchCart(getState())) {    
                    return dispatch(fetchCart());
                }

            case 'ORDERS':
                if (shouldFetchOrders(getState())) {    
                    return dispatch(fetchOrders());
                }
        }
    }
}

export function selectProduct(product) {
    return (dispatch) => {
        dispatch(openDetailModal(product));
        return dispatch({
            type: 'SELECT_PRODUCT',
            product: product
        });
    }
}

function shouldFetchCart(state) {
    const cartState = state.cart;

    if (!cartState.products || cartState.products.length === 0) {
        return true;
    } else if (cartState.isFetching) {
        return false;
    } else {
        return cartState.didInvalidate;
    }
}

function requestCart() {
    return {
        type: 'REQUEST_CART'
    }
}

function receiveCart(json) {
    return {
        type: 'RECEIVE_CART',
        products: json.data.s === 'p' ? json.data.d : [],
        receivedAt: Date.now()
    }
}

function fetchCart() {
    return dispatch => {
        dispatch(requestCart());
        return axios.get(`/cart/list`)
            .then(json => dispatch(receiveCart(json)))
    }
}


function shouldFetchOrders(state) {
    const orderState = state.orders;

    if (!orderState.orders || orderState.orders.length === 0) {
        return true;
    } else if (orderState.isFetching) {
        return false;
    } else {
        return orderState.didInvalidate;
    }
}

function requestOrders() {
    return {
        type: 'REQUEST_ORDERS'
    }
}

function receiveOrders(json) {
    return {
        type: 'RECEIVE_ORDERS',
        orders: json.data.s === 'p' ? json.data.d : [],
        receivedAt: Date.now()
    }
}

function fetchOrders() {
    return dispatch => {
        dispatch(requestOrders());
        return axios.get(`/orders/list`)
            .then(json => dispatch(receiveOrders(json)))
    }
}


function deletingOrder() {
    return {
        type: 'DELETING_ORDER'
    }
}

function deleteOrderFailed() {
    return {
        type: 'FAILED_DELETING_ORDER'
    }
}

function deletedOrder(data) {
    return {
        type: 'ORDER_DELETED',
        orderID: data
    }
}


export function deleteOrder(orderID) {
    return (dispatch) => {
        //const products = getState().cart.products;
        dispatch(deletingOrder());
        const postData = {
            orderID: orderID
        };
        return axios.post(`/orders/delete`, postData)
            .then(json => json.data.s == 'p' ? dispatch(deletedOrder(orderID)) : dispatch(deleteOrderFailed()))
    }
}