import { combineReducers } from 'redux'

export const modal = (
    state = {
        isOpen:false,
        product: null
    },
    action
) => {
    switch (action.type) {
        case 'OPEN_PRODUCT_DETAIL_MODAL':
            return Object.assign({}, state, {
                isOpen: true,
                product: action.product
            });
        case 'CONFIRM_MODAL':
        case 'CLOSE_MODAL':
            return Object.assign({}, state, {
                isOpen: false,
                product: null
            });
        default:
            return state
    }
};