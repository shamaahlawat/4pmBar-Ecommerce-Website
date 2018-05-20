import axios from 'axios';

import * as CONSTANTS from './constants';

const method_types = {
    get: "GET",
    post: "POST",
    delete: "DELETE",
    put: "PUT"
};

function getHeaders() {
    let user = localStorage.getItem('user');
    user = user && (user != 'undefined') ? JSON.parse(localStorage.getItem('user')) : null;
    let headers = {
        'Content-Type': 'application/json'
    };
    if (user && (user.uid || user._id) && user.hash) {
        headers.uid = user.uid || user._id;
        headers.hash = user.hash;
    }
    return headers;
}

function fetchDataAndProceed(url, method, data) {
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            params: method === 'GET' ? data : {},
            data: method !== 'GET' ? data : {},
            url: url,
            baseURL: CONSTANTS.base_url,
            headers: getHeaders(),
            validateStatus: function (status) {
                return ((status >= 200 && status < 300) || status === 412 || status === 401 || status === 403 || status === 400 || status === 422);
            }
        }).then((response) => {

            if (response.status >= 400) {
                localStorage.setItem('user', null);
                response.data.status = response.status;
                return reject(response.data);
            } else {
                return resolve(response.data);
            }

        }).catch(err => {
            return reject(err.data);
        });
    });
}

/*--------------------------- APIS ------------------------ */

//HOME PAGE API
export const getTestimonialList = (data) => {
    return fetchDataAndProceed('/testimonials.json', method_types.get, data);
};

export const getSliderImages = (data) => {
    return fetchDataAndProceed('/home_page_sliders.json', method_types.get, data);
};

export const getHomeProductList = (data) => {
    return fetchDataAndProceed('/products?home=true', method_types.get, data);
};

export const getPages = (data) => {
    return fetchDataAndProceed('/pages?active=true', method_types.get, data);
};

export const getFaqs = (data) => {
    return fetchDataAndProceed('/faqs.json', method_types.get, data);
};

export const getPurchaseDetails = (data) => {
    return fetchDataAndProceed('/purchase_options?active=true', method_types.get, data);
};

//CONTACT US PAGE API
export const getContactDetails = (data) => {
    return fetchDataAndProceed('/about_us_infos?contact=true', method_types.get, data);
};

export const submitContactDetails = (data) => {
    return fetchDataAndProceed('/contact_us_infos.json', method_types.post, data);
};

export const subscribeWithEmail = (data) => {
    return fetchDataAndProceed('/subscriptions.json', method_types.post, data);
};

//PRODUCT PAGE API
export const getProductsList = (data) => {
    return fetchDataAndProceed('/products.json?list=true', method_types.get, data);
};

export const getProductDetails = (data) => {
    return fetchDataAndProceed('/products/' + data + '.json', method_types.get, data);
};

//cart apis
export const createOrder = (data) => {
    return fetchDataAndProceed('/orders.json', method_types.post, data);
};

export const updatePaymentStatus = (data) => {
    return fetchDataAndProceed('/orders/capture_payment.json', method_types.post, data);
};



