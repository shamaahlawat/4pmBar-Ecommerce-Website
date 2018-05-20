const action_types = {
    SYST_LANG_SET: "SYST_LANG_SET",
    DEVICE_DATA_LOADED: "DEVICE_DATA_LOADED",
    PAGE_CHANGED: "PAGE_CHANGED",

    //HOME PAGE
    GET_SLIDER_LIST_LOADING: "GET_SLIDER_LIST_LOADING",
    GET_SLIDER_LIST_LOADED: "GET_SLIDER_LIST_LOADED",
    GET_SLIDER_LIST_LOAD_ERR: "GET_SLIDER_LIST_LOAD_ERR",

    GET_HOME_PRODUCT_LIST_LOADING: "GET_HOME_PRODUCT_LIST_LOADING",
    GET_HOME_PRODUCT_LIST_LOADED: "GET_HOME_PRODUCT_LIST_LOADED",
    GET_HOME_PRODUCT_LIST_LOAD_ERR: "GET_HOME_PRODUCT_LIST_LOAD_ERR",
    SET_CURRENT_PRODUCT_DETAIL: "SET_CURRENT_PRODUCT_DETAIL",

    GET_PAGES_LOADING: "GET_PAGES_LOADING",
    GET_PAGES_LOADED: "GET_PAGES_LOADED",
    GET_PAGES_LOAD_ERR: "GET_PAGES_LOAD_ERR",

    SET_PURCHASE_DETAILS: "SET_PURCHASE_DETAILS",
    PURCHASE_ERROR: "PURCHASE_ERROR",

    //TESTIMONIALS
    GET_TESTIMONIAL_LIST_LOADING: 'GET_TESTIMONIAL_LIST_LOADING',
    GET_TESTIMONIAL_LIST_LOADED: 'GET_TESTIMONIAL_LIST_LOADED',
    GET_TESTIMONIAL_LIST_LOAD_ERR: 'GET_TESTIMONIAL_LIST_LOAD_ERR',

    //PRODUCT
    GET_PRODUCT_LIST_LOADING: 'GET_PRODUCT_LIST_LOADING',
    GET_PRODUCT_LIST_LOADED: 'GET_PRODUCT_LIST_LOADED',
    GET_PRODUCT_LIST_LOAD_ERR: 'GET_PRODUCT_LIST_LOAD_ERR',
    GET_PRODUCT_DETAILS_LOADING: 'GET_PRODUCT_DETAILS_LOADING',
    GET_PRODUCT_DETAILS_LOADED: 'GET_PRODUCT_DETAILS_LOADED',
    GET_PRODUCT_DETAILS_LOAD_ERR: 'GET_PRODUCT_DETAILS_LOAD_ERR',

    //GET CONTACT DETAILS
    COMPANY_CONTACT_DETAILS_LOADING: "COMPANY_CONTACT_DETAILS_LOADING",
    COMPANY_CONTACT_DETAILS_LOADED: "COMPANY_CONTACT_DETAILS_LOADED",
    COMPANY_CONTACT_DETAILS_LOAD_ERR: "COMPANY_CONTACT_DETAILS_LOAD_ERR",

    POST_ENQUIRY_LOADING: 'POST_ENQUIRY_LOADING',
    POST_ENQUIRY_LOADED: 'POST_ENQUIRY_LOADED',
    POST_ENQUIRY_LOAD_ERR: 'POST_ENQUIRY_LOAD_ERR',

    SUBSCRIBE_WITH_EMAIL_LOADING: 'SUBSCRIBE_WITH_EMAIL_LOADING',
    SUBSCRIBE_WITH_EMAIL_LOADED: 'SUBSCRIBE_WITH_EMAIL_LOADED',
    SUBSCRIBE_WITH_EMAIL_LOAD_ERR: 'SUBSCRIBE_WITH_EMAIL_LOAD_ERR',

    //FAQ
    GET_FAQ_LIST_LOADING: 'GET_FAQ_LIST_LOADING',
    GET_FAQ_LIST_LOADED: 'GET_FAQ_LIST_LOADED',
    GET_FAQ_LIST_LOAD_ERR: 'GET_FAQ_LIST_LOAD_ERR',

    //CART DETAILS
    UPDATE_SHIPPING_DETAILS: "UPDATE_SHIPPING_DETAILS",
    UPDATE_DROPDOWN_DETAILS: "UPDATE_DROPDOWN_DETAILS",
    UPDATE_CART_ITEMS: "UPDATE_CART_ITEMS",
    INITIALIZE_CART: "INITIALIZE_CART",
    UPDATE_DROPDOWN_VALUE: "UPDATE_DROPDOWN_VALUE",
    UPDATE_SELECTED_VARIENT: "UPDATE_SELECTED_VARIENT",
    UPDATE_QUANTITY: "UPDATE_QUANTITY",
    INC_QUANTITY: "INC_QUANTITY",
    DEC_QUANTITY: "DEC_QUANTITY",
    SUBMIT_ORDER_DETAILS: "SUBMIT_ORDER_DETAILS",
    REMOVE_FROM_CART: "REMOVE_FROM_CART",
    UPDATE_SUBSCRIBE_DETAILS: "UPDATE_SUBSCRIBE_DETAILS",

    //ORDER DETAILS
    ORDER_ADDED: "ORDER_ADDED",
    ORDER_ADD_ERR: "ORDER_ADD_ERR",
    ORDER_UPDATED: "ORDER_UPDATED",
    ORDER_UPDATING: "ORDER_UPDATING",
    ORDER_UPDATE_ERR: "ORDER_UPDATE_ERR",
    LOAD_CONFIRMATION_PAGE: "LOAD_CONFIRMATION_PAGE",
    CLEAR_CART: "CLEAR_CART",
    STOCK_NOT_AVAILABLE: "STOCK_NOT_AVAILABLE",
    SHOW_INSUFFICIENT_POP: "SHOW_INSUFFICIENT_POP",
    CLEAR_ERROR_VALUE: "CLEAR_ERROR_VALUE",
};

export default action_types;
