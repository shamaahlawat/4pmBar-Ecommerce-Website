import actionTypes from '../action_types';
import * as API from '../../../data/config/api';

export function getTestimonialList(data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.GET_TESTIMONIAL_LIST_LOADING,
        });
        
        API.getTestimonialList(data).then((res) => {
            dispatch({
                type: actionTypes.GET_TESTIMONIAL_LIST_LOADED,
                payload: res
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.GET_TESTIMONIAL_LIST_LOAD_ERR,
            });
        });
    };
}

export function getHomeProductList(data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.GET_HOME_PRODUCT_LIST_LOADING,
        });
        API.getHomeProductList(data).then((res) => {
            dispatch({
                type: actionTypes.GET_HOME_PRODUCT_LIST_LOADED,
                payload: res
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.GET_HOME_PRODUCT_LIST_LOAD_ERR,
            });
        });
    };
}

export function setCurrentProductDetail(index) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.SET_CURRENT_PRODUCT_DETAIL,
            payload: {
                index: index
            }
        });
    };
}

export function getSliderImages(data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.GET_SLIDER_LIST_LOADING,
        });
        API.getSliderImages(data).then((res) => {
            dispatch({
                type: actionTypes.GET_SLIDER_LIST_LOADED,
                payload: res
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.GET_SLIDER_LIST_LOAD_ERR,
            });
        });
    };
}

export function getPages(data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.GET_PAGES_LOADING,
        });

        API.getPages(data).then((res) => {
            dispatch({
                type: actionTypes.GET_PAGES_LOADED,
                payload: res
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.GET_PAGES_LOAD_ERR,
            });
        });
    };
}

export function getFaqs(data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.GET_FAQ_LIST_LOADING
        });

        API.getFaqs(data).then((res) => {
            dispatch({
                type: actionTypes.GET_FAQ_LIST_LOADED,
                payload: res
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.GET_FAQ_LIST_LOAD_ERR
            });
        });
    };
}

export function getPurchaseDetails(data) {
    return function (dispatch) {
        API.getPurchaseDetails(data).then((res) => {
            dispatch({
                type: actionTypes.SET_PURCHASE_DETAILS,
                payload: res
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.PURCHASE_ERROR,
            });
        });
    };
}




