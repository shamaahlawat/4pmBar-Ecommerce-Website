import actionTypes from '../action_types';
import * as API from '../../../data/config/api';

export function initializeCart() {
    return function (dispatch) {
        dispatch({
            type: actionTypes.INITIALIZE_CART
        });
    };
}

export function updateShippingDetails(path, data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.UPDATE_SHIPPING_DETAILS,
            payload: data,
            path: path
        });
    };
}

export function updateCartItems(data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.UPDATE_CART_ITEMS,
            payload: data,
        });
    };
}

export function updateSelectedVarient(data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.UPDATE_SELECTED_VARIENT,
            payload: data,
        });
    };
}

export function updateQuantity(data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.UPDATE_QUANTITY,
            payload: data,
        });
    };
}

export function incQuantity(cart_item, index) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.INC_QUANTITY,
            payload: {
                index,
                cart_item
            }
        });
    };
}

export function decQuantity(cart_item, index) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.DEC_QUANTITY,
            payload: {
                index,
                cart_item
            }
        });
    };
}

export function removeFromCart(cart_item, index) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.REMOVE_FROM_CART,
            payload: {
                index,
                cart_item
            }
        });
    };
}

export function createOrder(order) {
    return function (dispatch) {
        API.createOrder(order).then(function (response) {
            dispatch({
                type: actionTypes.ORDER_ADDED,
                payload: {
                    order_details: response
                }
            });

            let order_details = {
                ...response,
                total_count: order.order.order_items_attributes.length,
                email: order.order.email,
                phone: order.order.phone
            };
            openRazorPay(dispatch, order_details);

            dispatch({
                type: actionTypes.STOCK_NOT_AVAILABLE,
                payload: {
                    order_details: response
                }
            });

        }).catch(function (response) {
            let message = "";
            if (response.errors) {
                message = "";
                Object.keys(response.errors).map(error_key => {
                    message = `\n${message} ${response.errors[error_key].join(',')}`;
                });
            }
            dispatch({
                type: actionTypes.SHOW_INSUFFICIENT_POP,
                payload: message
            });
            setTimeout(() => {
                dispatch({
                    type: actionTypes.CLEAR_ERROR_VALUE,
                });
            }, 3000);
        });
    };
}

function openRazorPay(dispatch, order) {
    window.openPaymentPage(order, function (razorResponse) {
        dispatch({
            type: actionTypes.ORDER_UPDATING,
            payload: {
                razorpay_id: razorResponse.razorpay_payment_id
            }
        });

        API.updatePaymentStatus({
            order_id: order.id, razorpay_id: razorResponse.razorpay_payment_id, amount: order.total
        }).then(function (res) {
            dispatch({
                type: actionTypes.ORDER_UPDATED,
                payload: res
            });
            dispatch({
                type: actionTypes.LOAD_CONFIRMATION_PAGE
            });
            dispatch({
                type: actionTypes.CLEAR_CART
            });
        }).catch(function () {
            dispatch({
                type: actionTypes.ORDER_UPDATE_ERR
            });
        });
    });
}
