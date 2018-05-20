import actionTypes from '../action_types';
import states from './states';
import dotProp from 'dot-prop-immutable';

export default function product_details(state = states.productDetails, action) {
    switch (action.type) {
        case actionTypes.UPDATE_DROPDOWN_VALUE:
            return dotProp.set(state, action.path, action.payload);

        case actionTypes.GET_PRODUCT_LIST_LOADING: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    product_list_loading: true,
                    product_list_loaded: false,
                    product_list_load_err: false
                }
            };
        }
        
        case actionTypes.GET_PRODUCT_LIST_LOADED: {
            return {
                ...state,
                products: action.payload.products.map((product) => {
                    product.product_variants.map(variant => {
                        variant.product_id = product.id;
                        variant.background_color = product.background_color;
                        variant.image = product.image;
                        variant.product_name = product.name;
                    });
                    return product;
                }),
                loaders : {
                    ...state.loaders,
                    product_list_loading: false,
                    product_list_loaded: true,
                    product_list_load_err: false
                }
            };
        }

        case actionTypes.GET_PRODUCT_LIST_LOAD_ERR: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    product_list_loading: false,
                    product_list_loaded: false,
                    product_list_load_err: true
                }
            };
        }

        case actionTypes.GET_PRODUCT_DETAILS_LOADING: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    product_details_loading: true,
                    product_details_loaded: false,
                    product_details_load_err: false
                }
            };
        }
        
        case actionTypes.GET_PRODUCT_DETAILS_LOADED: {
            return {
                ...state,
                current_product: {
                    ...action.payload.product,
                    product_variants: action.payload.product.product_variants.map(variant => {
                        variant.product_id = action.payload.product.id;
                        variant.product_name = action.payload.product.name;
                        return variant;
                    })
                },
                loaders : {
                    ...state.loaders,
                    product_details_loading: false,
                    product_details_loaded: true,
                    product_details_load_err: false
                }
            };
        }

        case actionTypes.GET_PRODUCT_DETAILS_LOAD_ERR: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    product_details_loading: false,
                    product_details_loaded: false,
                    product_details_load_err: true
                }
            };
        }

        default:
            return state;
    }
}
