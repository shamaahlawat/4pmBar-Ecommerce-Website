import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import page_details from './page_details/reducers';
import home_page_details from './home_page_details/reducers';
import contact_details from './contact_details/reducers';
import product_details from './product_details/reducers';
import cart_details from './cart_details/reducers';

const rootReducer = combineReducers({
    page_details,
    home_page_details,
    contact_details,
    product_details,
    cart_details,
    routing: routerReducer
});

export default rootReducer;
