import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, } from 'antd';

import './index.scss';

import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';
import * as productActions from '../../data/redux/product_details/actions';
import * as cartActions from '../../data/redux/cart_details/actions';

import CartItems from './components/cart_items';
import AdditionalItems from './components/additional_items';
import BackgroundImageHeader from '../../components/background_image_header';

let heading = 'CART';

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, productActions, cartActions), dispatch)
    };
}

function mapStateToProps(state) {
    return {
        product_details: state.product_details,
        cart_details: state.cart_details,
    };
}

class Cart extends Component {

    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.CART, CONSTANTS.appPages.CART);
        this.props.actions.getProductsList();
    }

    render() {

        return (
            <Row>
                <Col xs={{ span: 24 }} className="aboutUsContainer font-20">
                    <Col xs={{ span: 24 }}>
                        <BackgroundImageHeader bg_current_page={heading} style={{ margin: '0px' }} current_page="about_us" />
                    </Col>
                    <Col xs={{ span: 22, offset: 1 }} className="tb-pad-40">
                        <div className="mainHeading b-mrgn-40">MY CART</div>
                        <Col xs={{ span: 24 }} md={{ span: 15 }}>
                            <CartItems product_details={this.props.product_details} history={this.props.history} />
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 20, offset: 2 }} md={{ span: 8, offset: 1 }}>
                            <AdditionalItems product_details={this.props.product_details} />
                        </Col>
                    </Col>
                </Col>
            </Row>
        );
    }
}

Cart.propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object,
    product_details: PropTypes.object,
    match: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
