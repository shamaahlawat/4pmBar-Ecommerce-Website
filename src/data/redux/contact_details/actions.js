import actionTypes from '../action_types';
import * as API from '../../../data/config/api';

export function getCompanyContactDetails(data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.COMPANY_CONTACT_DETAILS_LOADING
        });

        API.getContactDetails(data).then((res) => {
            dispatch({
                type: actionTypes.COMPANY_CONTACT_DETAILS_LOADED,
                payload: res
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.COMPANY_CONTACT_DETAILS_LOAD_ERR
            });
        });
    };
}

export function submitEmailSubscription(data) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.SUBSCRIBE_WITH_EMAIL_LOADING
        });

        API.subscribeWithEmail(data).then((res) => {
            dispatch({
                type: actionTypes.SUBSCRIBE_WITH_EMAIL_LOADED,
                payload: res
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.SUBSCRIBE_WITH_EMAIL_LOAD_ERR
            });
        });
    };
}

export function submitContactDetails(data){
    return function (dispatch) {
        dispatch({
            type: actionTypes.POST_ENQUIRY_LOADING
        });

        API.submitContactDetails(data).then((res) => {
            dispatch({
                type: actionTypes.POST_ENQUIRY_LOADED,
                payload: res
            });
        }).catch(() => {
            dispatch({
                type: actionTypes.POST_ENQUIRY_LOAD_ERR
            });
        });
    };
}


