import actionTypes from '../action_types';
import states from './states';

export default function home_page_details(state = states.homePageDetails, action) {
    switch (action.type) {
        case actionTypes.GET_TESTIMONIAL_LIST_LOADING: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    testimonial_list_loading: true,
                    testimonial_list_loaded: false,
                    testimonial_list_load_err: false
                }
            };
        }

        case actionTypes.GET_TESTIMONIAL_LIST_LOADED: {
            return {
                ...state,
                testimonials: action.payload.testimonials,
                loaders : {
                    ...state.loaders,
                    testimonial_list_loading: false,
                    testimonial_list_loaded: true,
                    testimonial_list_load_err: false
                }
            };
        }

        case actionTypes.GET_TESTIMONIAL_LIST_LOAD_ERR: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    testimonial_list_loading: false,
                    testimonial_list_loaded: false,
                    testimonial_list_load_err: true
                }
            };
        }

        case actionTypes.GET_SLIDER_LIST_LOADING: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    slider_list_list_loading: true,
                    slider_list_list_loaded: false,
                    slider_list_list_load_err: false
                }
            };
        }

        case actionTypes.GET_SLIDER_LIST_LOADED: {
            return {
                ...state,
                home_page_sliders: action.payload.homepagesliders,
                loaders : {
                    ...state.loaders,
                    slider_list_list_loading: false,
                    slider_list_list_loaded: true,
                    slider_list_list_load_err: false
                }
            };
        }

        case actionTypes.GET_SLIDER_LIST_LOAD_ERR: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    slider_list_list_loading: false,
                    slider_list_list_loaded: false,
                    slider_list_list_load_err: true
                }
            };
        }

        case actionTypes.GET_HOME_PRODUCT_LIST_LOADING: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    home_product_list_loading: true,
                    home_product_list_loaded: false,
                    home_product_list_load_err: false
                }
            };
        }

        case actionTypes.GET_HOME_PRODUCT_LIST_LOADED: {
            return {
                ...state,
                products: action.payload.products,
                current_product: action.payload.products[0],
                loaders : {
                    ...state.loaders,
                    home_product_list_loading: false,
                    home_product_list_loaded: true,
                    home_product_list_load_err: false
                }
            };
        }

        case actionTypes.GET_HOME_PRODUCT_LIST_LOAD_ERR: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    home_product_list_loading: false,
                    home_product_list_loaded: false,
                    home_product_list_load_err: true
                }
            };
        }

        case actionTypes.SET_CURRENT_PRODUCT_DETAIL: {
            return {
                ...state,
                current_product: state.products[action.payload.index]
            };
        }

        case actionTypes.SET_PURCHASE_DETAILS: {
            return {
                ...state,
                purchase_options: action.payload.purchase_options,
            };
        }

        case actionTypes.GET_PAGES_LOADING: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    get_pages_loading: true,
                    get_pages_loaded: false,
                    get_pages_load_err: false
                }
            };
        }

        case actionTypes.GET_PAGES_LOADED: {
            return {
                ...state,
                images: action.payload.images,
                page_properties: action.payload.page_properties,
                loaders : {
                    ...state.loaders,
                    get_pages_loading: false,
                    get_pages_loaded: true,
                    get_pages_load_err: false
                }
            };
        }

        case actionTypes.GET_PAGES_LOAD_ERR: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    get_pages_loading: false,
                    get_pages_loaded: false,
                    get_pages_load_err: true
                }
            };
        }

        case actionTypes.GET_FAQ_LIST_LOADING: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    faq_list_loading: true,
                    faq_list_loaded: false,
                    faq_list_load_err: false
                }
            };
        }

        case actionTypes.GET_FAQ_LIST_LOADED: {
            return {
                ...state,
                faqs: action.payload.FAQ,
                loaders : {
                    ...state.loaders,
                    faq_list_loading: false,
                    faq_list_loaded: true,
                    faq_list_load_err: false
                }
            };
        }

        case actionTypes.GET_FAQ_LIST_LOAD_ERR: {
            return {
                ...state,
                loaders : {
                    ...state.loaders,
                    faq_list_loading: false,
                    faq_list_loaded: false,
                    faq_list_load_err: true
                }
            };
        }

        default:
            return state;
    }
}
