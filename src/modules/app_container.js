import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Router, Route, Switch } from 'react-router';

import * as UTILS from '../data/config/utils';
import * as pageActions from '../data/redux/page_details/actions';
import * as homeActions from '../data/redux/home_page_details/actions';
import * as contactPageActions from '../data/redux/contact_details/actions';

import AppHeader from '../components/appheader';
import Footer from '../components/footer';
import Home from "./home";
import Contact from './contact_us';
import AboutUs from './about_us';
import OurProduct from './our_products';
import WhereToBuy from './where_to_buy';
import ShippingDetails from './shipping_details';
import ProductDetail from './product_detail';
import Cart from './cart';
import ConfirmationPage from './confirmation_page';
import TermsConditions from './terms_conditions';
import Faqs from './faq';

function mapStateToProps(state) {
    return {
        page_details: state.page_details ,
        home_page_details: state.home_page_details,
        contact_details: state.contact_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, homeActions, contactPageActions), dispatch)
    };
}

class AppContainer extends Component {
    componentWillMount() {
        this.timeout = false;
        const systLang = UTILS.getLang();
        this.props.actions.setDeviceData(UTILS.checkDevice.deviceStatus());
        if (systLang) {
            this.props.actions.setLang(systLang);
        }
        this.props.actions.getTestimonialList();
    }

    componentDidMount() {
        let self = this;
        window.scrollTo(0,0);
        window.addEventListener("resize", function () {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                self.props.actions.setDeviceData(UTILS.checkDevice.deviceStatus());
            }, 300);
        });
    }

    render() {
        const {home_page_details, contact_details, actions, history} = this.props;

        return (
            <div className="flex-column full-width full-height AppContainer">
                <AppHeader history={this.props.history} />
                <div className="is-no-pad bg-white">
                    <Router history={this.props.history} onUpdate={() => { window.scrollTo(0, 0); }}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/contact_us" component={Contact} />
                            <Route path="/about_us" component={AboutUs} />
                            <Route path="/our_product">
                                <Switch>
                                    <Route exact path="/our_product" component={OurProduct} />
                                    <Route path="/our_product/:product_id" component={ProductDetail} />
                                </Switch>
                            </Route>
                            <Route path="/where_to_buy" component={WhereToBuy} />
                            <Route path="/shipping_details" component={ShippingDetails} />
                            <Route path="/product_details" component={ProductDetail} />
                            <Route path="/cart" component={Cart} />
                            <Route path="/confirmation_page" component={ConfirmationPage} />
                            <Route path="/terms-conditions" component={TermsConditions} />
                            <Route path="/faqs" component={Faqs} />
                        </Switch>
                    </Router>
                </div>
                <Footer home_page_details={home_page_details} contact_details={contact_details} actions={actions} history={history}/>
            </div>
        );
    }
}

AppContainer.propTypes = {
    actions: PropTypes.object,
    history: PropTypes.object,
    home_page_details: PropTypes.object,
    contact_details: PropTypes.object,
    page_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppContainer));
