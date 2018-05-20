import React, { Component } from 'react';import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Button, Input } from 'antd';

import './index.scss';

import * as CONSTANTS from '../../../../data/config/constants';
import * as pageActions from '../../../../data/redux/page_details/actions';
import * as cartActions from '../../../../data/redux/cart_details/actions';

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, cartActions), dispatch)
    };
}
function mapStateToProps(state) {
    return {
        cart_details: state.cart_details,
    };
}

class CartItems extends Component {
    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.CART, CONSTANTS.appPages.CART);
    }

    render() {
        let { cart_details, actions } = this.props;
        return (
            <Row className="totalProducts border">
                <Col xs={{ span: 24 }} className="header font-16 pad-20">
                    <Col xs={{ span: 12 }} className="flex flex-center">PRODUCT</Col>
                    <Col xs={{ span: 4 }} className="flex flex-center">PRICE</Col>
                    <Col xs={{ span: 4 }} className="flex flex-center">QUANTITY</Col>
                    <Col xs={{ span: 4 }} className="flex flex-center">SUBTOTAL</Col>
                </Col>
                {cart_details.cart_items.map((cart_detail, index) => {
                    return (
                        <Col xs={{ span: 24 }} className="body pad-30 font-14" key={index}>
                            <Col xs={{ span: 12 }} className="flex-row flex-ac">
                                <div className="productImage full-flex r-mrgn-20" style={{ background: cart_detail.background_color }}>
                                    <img className="img-contain" src={cart_detail.image} />
                                </div>
                                <div className="productDetail flex-column">
                                    <div className="is-font-bold">{cart_detail.name}
                                    </div>
                                    <div className="font-12 cartElement">{cart_detail.variant_name}</div>
                                    <div className="text-primary t-mrgn-5 is-cursor-ptr" onClick={() => { actions.removeFromCart(cart_detail, index); }}>Remove</div>
                                    <div className="brownBorder cartElement" />
                                </div>
                            </Col>
                            <Col xs={{ span: 4 }} className="flex flex-center">
                                {cart_detail.price}
                            </Col>
                            <Col xs={{ span: 4 }} className="flex flex-center">
                                <div className="circle decrement flex flex-center"
                                    onClick={() => { actions.decQuantity(cart_detail, index); }}>-</div>
                                <div className="lr-mrgn-20 quantityElement">
                                    {cart_detail.quantity}
                                </div>
                                <div className="circle increment flex flex-center" onClick={() => { actions.incQuantity(cart_detail, index); }}>+</div>
                            </Col>
                            <Col xs={{ span: 4 }} className="flex flex-center">
                                Rs.{cart_detail.amount}
                            </Col>
                        </Col>
                    );
                })}
                <Col xs={{ span: 24 }} className="totalSection flex flex-jsb r-pad-30 tb-pad-30">
                    <div className="flex l-mrgn-10 couponCode">
                        <Input
                            type="text"
                            required
                            name="name"
                            className="form-control input r-mrgn-20"
                            placeholder="COUPON CODE"
                            setfieldsvalue=""
                            onChange={this.handleInput}
                        />
                        <Button className="paymentButton is-no-mrgn">APPLY
                        </Button>
                    </div>
                    <div className="total font-14">
                        <div className="">Sub Total:
                            <span className="is-font-normal text-primary l-mrgn-5">
                                {cart_details.total_amount}
                            </span>
                        </div>
                        <div className="">Coupon code discount:
                            <span className="is-font-normal text-primary l-mrgn-5">Rs.0
                            </span>
                        </div>
                        <div className="">Tax:
                            <span className="is-font-normal text-primary l-mrgn-5"> Rs.0
                            </span>
                        </div>
                        <div className="">Total:
                            <span className="is-font-normal text-primary l-mrgn-5">
                                {cart_details.total_amount}
                            </span>
                        </div>
                        {cart_details.total_amount !== 0 &&
                            <Button className="paymentButton"
                                onClick={() =>
                                    this.props.history.push('/shipping_details')}>CONTINUE
                            </Button>
                        }
                    </div>
                </Col>
            </Row>
        );
    }
}

CartItems.propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object,
    product_details: PropTypes.object,
    cart_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);
