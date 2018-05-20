import actionTypes from '../action_types';
import * as API from '../../../data/config/api';

export function getProductsList(data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.GET_PRODUCT_LIST_LOADING,
        });

        API.getProductsList(data).then((res) => {
            dispatch({
                type: actionTypes.GET_PRODUCT_LIST_LOADED,
                payload: res
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.GET_PRODUCT_LIST_LOAD_ERR,
            });
        });
    };
}

export function getProductDetails(data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.GET_PRODUCT_DETAILS_LOADING,
        });

        API.getProductDetails(data).then((res) => {
            dispatch({
                type: actionTypes.GET_PRODUCT_DETAILS_LOADED,
                payload: res
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.GET_PRODUCT_DETAILS_LOAD_ERR,
            });
        });
    };
}




