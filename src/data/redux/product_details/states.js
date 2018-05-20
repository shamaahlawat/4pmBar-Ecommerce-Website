const states = {
    productDetails: {
        products: [],
        current_product: undefined,
        type: "",
        quantity: 2,
    },
    loaders: {
        product_list_loading: false,
        product_list_loaded: false,
        product_list_load_err: false,
        product_details_loading: false,
        product_details_loaded: false,
        product_details_load_err: false,
    }
};

export default states;
