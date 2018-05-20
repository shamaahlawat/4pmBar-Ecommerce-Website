const states = {
    contact_details: {
        name: '',
        email: '',
        phone: '',
        message: ''
    },
    about_us: {},
    loaders: {
        company_contact_details_loading: false,
        company_contact_details_loaded: false,
        company_contact_details_load_err: false,
        post_enquiry_loading: false,
        post_enquiry_loaded: false,
        post_enquiry_load_err: false,
        subscribe_with_email_loading: false,
        subscribe_with_email_loaded: false,
        subscribe_with_email_load_err: false
    },
};

export default states;
