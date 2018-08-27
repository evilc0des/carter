import { combineReducers } from 'redux'
import { modal } from './uiReducers'


function auth(
    state = {
        attemptingLogin: false,
        loginSuccess: false,
        attemptingLogout: false,
        logoutSuccess: false
    },
    action
){
    switch (action.type) {
        case 'ATTEMPT_LOGIN':
            return Object.assign({}, state, {
                attemptingLogin: true
            });
        case 'SET_LOGIN_SUCCESS':
            return Object.assign({}, state, {
                attemptingLogin: false,
                loginSuccess: action.success == 'p' ? true : false
            });
        case 'ATTEMPT_LOGOUT':
            return Object.assign({}, state, {
                attemptingLogout: true
            });
        case 'SET_LOGOUT_SUCCESS':
            return Object.assign({}, state, {
                attemptingLogout: false,
                logoutSuccess: action.success == 'p' ? true : false
            });
        default:
            return state
    }
}

function toolbar(
    state = {
        isOpen: false,
        content: 'STORES'
    },
    action
){
    switch (action.type) {
        case 'TOGGLE_SIDEBAR_BUTTON':
            return Object.assign({}, state, {
                isOpen: (state.isOpen  && action.button !== state.content) ? state.isOpen : !state.isOpen,
                content: action.button
            });
        default:
            return state
    }
}

function products(
    state = {
        isFetching: false,
        isCreatingStore: false,
        didInvalidate: false,
        createStoreFormOpen: false,
        products: [],
        selectedProduct: null
    },
    action
){
    switch(action.type) {
        case 'INVALIDATE_PRODUCTS':
            return Object.assign({}, state, { didInvalidate: true});
        case 'REQUEST_PRODUCTS':
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case 'RECEIVE_PRODUCTS':
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                products: action.products,
                lastUpdated: action.receivedAt
            });
        case 'TOGGLE_STORE_CREATE_FORM':
            return Object.assign({}, state, {
                createStoreFormOpen: action.state
            });
        case 'CREATING_STORE':
            return Object.assign({}, state, {
                isCreatingStore: true
            });
        case 'STORE_CREATED':
            return Object.assign({}, state, {
                isCreatingStore: false,
                stores: [...state.stores, action.store],
                createStoreFormOpen: false
            });
        case 'STORE_DELETED':
            return Object.assign({}, state, {
                isCreatingStore: false,
                stores: state.stores.filter(e => e._id !== action.store),
                createStoreFormOpen: false
            });
        case 'SELECT_PRODUCT':
            return Object.assign({}, state, {
                selectedProduct: action.product
            });
        case 'OPEN_STORE_DELETE_MODAL':
            return Object.assign({}, state, {
                storeToDelete: action.store
            });
        case 'CANCEL_STORE_DELETE':
            return Object.assign({}, state, {
                storeToDelete: null
            });
        default:
            return state;
    }
}

function orders(
    state = {
        orders: [],
        isFetching: true,
        didInvalidate: false
    },
    action
){
    switch (action.type) {
        case 'INVALIDATE_ORDERS':
            return Object.assign({}, state, { didInvalidate: true});
        case 'REQUEST_ORDERS':
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case 'RECEIVE_ORDERS':
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                orders: action.orders,
                lastUpdated: action.receivedAt
            });
        case 'ORDER_CREATED':
            return Object.assign({}, state, {
                orders: [...state.orders, {
                    ...action.order
                }]
            });
        case 'ORDER_DELETED':
            return Object.assign({}, state, {
                orders: state.orders.filter(order => order._id != action.orderID)
            });
        default:
            return state
    }
}

function cart(
    state = {
        products: [],
        isFetching: true,
        didInvalidate: false
    },
    action
){
    switch (action.type) {
        case 'INVALIDATE_CART':
            return Object.assign({}, state, { didInvalidate: true});
        case 'REQUEST_CART':
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case 'RECEIVE_CART':
            let arr = action.products.map(product => ({
                _id: product.product,
                qty: product.quantity,
                variant: product.variant
            }))
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                products: arr,
                lastUpdated: action.receivedAt
            });
        case 'ADDED_TO_CART':
            let updated = false;
            let productArr = state.products.map(product => {
                    if(product._id === action.product && product.variant === action.variant){
                        updated = true;
                        return {...product, qty: parseInt(product.qty) + parseInt(action.qty)}
                    }
                    else return product;
            });
            return Object.assign({}, state, {
                products: updated ? productArr : [...state.products, {
                    _id: action.product,
                    qty: action.qty,
                    variant: action.variant
                }]
            });
        case 'ORDER_CREATED':
            return Object.assign({}, state, {
                products: []
            });
        default:
            return state
    }
}

const rootReducer = combineReducers({
    toolbar,
    auth,
    cart,
    orders,
    products,
    uiState: modal
});

export default rootReducer