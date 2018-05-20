import actionTypes from '../action_types';
import states from './states';

export default function contact_details(state = states.contact_details, action) {
    switch (action.type) {
        case actionTypes.COMPANY_CONTACT_DETAILS_LOADING: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    company_contact_details_loading: true,
                    company_contact_details_loaded: false,
                    company_contact_details_load_err: false
                }
            };
        }
        
        case actionTypes.COMPANY_CONTACT_DETAILS_LOADED: {
            return {
                ...state,
                about_us: action.payload.about_us,
                loaders : {
                    ...state.loaders,
                    company_contact_details_loading: false,
                    company_contact_details_loaded: true,
                    company_contact_details_load_err: false
                }
            };
        }

        case actionTypes.COMPANY_CONTACT_DETAILS_LOAD_ERR: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    company_contact_details_loading: false,
                    company_contact_details_loaded: false,
                    company_contact_details_load_err: true
                }
            };
        }

        case actionTypes.POST_ENQUIRY_LOADING: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    post_enquiry_loading: true,
                    post_enquiry_loaded: false,
                    post_enquiry_load_err: false
                }
            };
        }
        
        case actionTypes.POST_ENQUIRY_LOADED: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    post_enquiry_loading: false,
                    post_enquiry_loaded: true,
                    post_enquiry_load_err: false
                }
            };
        }

        case actionTypes.POST_ENQUIRY_LOAD_ERR: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    post_enquiry_loading: false,
                    post_enquiry_loaded: false,
                    post_enquiry_load_err: true
                }
            };
        }

        case actionTypes.SUBSCRIBE_WITH_EMAIL_LOADING: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    subscribe_with_email_loading: true,
                    subscribe_with_email_loaded: false,
                    subscribe_with_email_load_err: false
                }
            };
        }
        
        case actionTypes.SUBSCRIBE_WITH_EMAIL_LOADED: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    subscribe_with_email_loading: false,
                    subscribe_with_email_loaded: true,
                    subscribe_with_email_load_err: false
                }
            };
        }

        case actionTypes.SUBSCRIBE_WITH_EMAIL_LOAD_ERR: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    subscribe_with_email_loading: false,
                    subscribe_with_email_loaded: false,
                    subscribe_with_email_load_err: true
                }
            };
        }

        default:
            return state;
    }
}
