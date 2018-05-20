import actionTypes from '../action_types';
import states from './states';
import dotProp from 'dot-prop-immutable';

export default function cart_details(state = states.cartDetails, action) {
    switch (action.type) {
        case actionTypes.UPDATE_SHIPPING_DETAILS:
            return dotProp.set(state, action.path, action.payload);

        case actionTypes.UPDATE_SELECTED_VARIENT: {
            return {
                ...state,
                selected_varient: {
                    ...state.selected_varient,
                    [action.payload.product_id]: action.payload
                }
            };
        }

        case actionTypes.UPDATE_QUANTITY: {
            return {
                ...state,
                updated_quantity: action.payload
            };
        }

        case actionTypes.INC_QUANTITY: {
            let cart_details = {
                ...state,
                cart_items: state.cart_items.map((item, i) => {
                    return (i === action.payload.index) ? {
                        ...item,
                        quantity: item.quantity + 1,
                        amount: item.price * (item.quantity + 1)
                    } : item;
                }),
            };

            cart_details.total_amount = cart_details.cart_items.reduce((total_amount, amount) => {
                return total_amount + amount.amount;
            }, 0);

            return cart_details;
        }

        case actionTypes.DEC_QUANTITY: {
            let cart_details;
            if (action.payload.cart_item.quantity === 1) {
                cart_details = {
                    ...state,
                    cart_items: [
                        ...state.cart_items.slice(0, action.payload.index),
                        ...state.cart_items.slice(action.payload.index + 1)
                    ],
                    cart_item_ids: [
                        ...state.cart_item_ids.slice(0, action.payload.index),
                        ...state.cart_item_ids.slice(action.payload.index + 1)
                    ],
                    total_amount: state.total_amount - action.payload.cart_item.amount
                };
                return cart_details;
            } else {
                cart_details = {
                    ...state,
                    cart_items: state.cart_items.map((item, i) => {
                        return (i === action.payload.index) ? {
                            ...item,
                            quantity: item.quantity - 1,
                            amount: item.price * (item.quantity - 1)
                        } : item;
                    }),
                    total_amount: state.total_amount - action.payload.cart_item.price
                };
                return cart_details;
            }
        }

        case actionTypes.REMOVE_FROM_CART: {
            let cart_details = {
                ...state,
                cart_items: [ //also fiter can be use
                    ...state.cart_items.slice(0, action.payload.index),
                    ...state.cart_items.slice(action.payload.index + 1)
                ],
                total_amount: state.total_amount - action.payload.cart_item.amount
            };
            return cart_details;
        }

        case actionTypes.UPDATE_DROPDOWN_VALUE:
            return dotProp.set(state, action.path, action.payload);

        case actionTypes.UPDATE_CART_ITEMS: {
            let item_matched = false;
            let count = 0;
            let cart_items = state.cart_items.map((item) => {
                if (item.product_variant_id === action.payload.product_variant_id) {
                    item_matched = true;
                    return {
                        ...item,
                        quantity: item.quantity + action.payload.quantity,
                        amount: item.amount + action.payload.amount,
                        count: count + 1,
                    };
                } else {
                    return item;
                }
            });

            let cart_details = {
                ...state,
                cart_items: item_matched ? cart_items : cart_items.concat(action.payload)
            };

            cart_items = cart_details.cart_items.map((item) => {
                return {
                    ...item,
                    count: count + 1,
                };
            });

            cart_details.total_amount = cart_details.cart_items.reduce((total_amount, amount) => {
                return total_amount + amount.amount;
            }, 0);
            return cart_details;
        }

        case actionTypes.ORDER_ADDED: {
            return {
                ...state,
                order_details: action.payload.order_details,
            };
        }

        case actionTypes.ORDER_UPDATING: {
            return {
                ...state,
                razorpay_id: action.payload.razorpay_id,
            };
        }

        case actionTypes.ORDER_UPDATED: {
            return {
                ...state,
                order_details: action.payload.order_details,
            };
        }

        case actionTypes.LOAD_CONFIRMATION_PAGE: {
            return {
                ...state,
                confirmation_page: {
                    success: true
                }
            };
        }

        case actionTypes.CLEAR_CART: {
            return states.cartDetails;
        }

        case actionTypes.SHOW_INSUFFICIENT_POP: {
            return {
                ...state,
                error: action.payload
            };
        }

        case actionTypes.CLEAR_ERROR_VALUE: {
            return {
                ...state,
                error: ''
            };
        }

        default:
            return state;
    }
}
