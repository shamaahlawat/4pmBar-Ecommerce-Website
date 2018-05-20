const states = {
    homePageDetails: {
        testimonials: [],
        home_page_sliders: [],
        products: [],
        current_product: undefined,
        images: [],
        purchase_options: [],
        page_properties: [],
        email: "",
        loaders: {
            success: false,
            slider_list_loading: false,
            slider_list_loaded: false,
            slider_list_load_err: false,
            home_product_list_loading: false,
            home_product_list_loaded: false,
            home_product_list_load_err: false,
            testimonial_list_loading: false,
            testimonial_list_loaded: false,
            testimonial_list_load_err: false,
            faq_list_loading: false,
            faq_list_loaded: false,
            faq_list_load_err: false,
            get_pages_loading: false,
            get_pages_loaded: false,
            get_pages_load_err: false,
        },
        faqs: [],
    }
};

export default states;
