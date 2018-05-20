import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Input, Button, Modal } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './index.scss';

import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';
import * as homePageActions from '../../data/redux/home_page_details/actions';
import * as shippingDetailsActions from '../../data/redux/cart_details/actions';

import BackgroundImageHeader from '../../components/background_image_header';

let heading = 'CART';
const FormItem = Form.Item;

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, homePageActions, shippingDetailsActions), dispatch)
    };
}

function mapStateToProps(state) {
    return {
        cart_details: state.cart_details,
    };
}

class ShippingDetails extends Component {
    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.SHIPPING_DETAILS, CONSTANTS.appPages.SHIPPING_DETAILS);
    }

    componentDidMount() {
        this.props.form.validateFields();
    }

    componentWillReceiveProps(nxtProps) {
        if (nxtProps.cart_details.confirmation_page.success === true) {
            this.props.history.push('/confirmation_page');
        }

        if (nxtProps.cart_details.error !== "") {
            // window.alert(nxtProps.cart_details.error);
            Modal.error({
                title: 'Sorry',
                content: nxtProps.cart_details.error,
                okText: 'Go to Cart',
                onOk: () => { this.props.history.push('/cart'); }
            });
        }
    }

    handleInput = (event) => {
        this.props.actions.updateShippingDetails(event.target.name, event.target.value);
    };

    createOrder = () => {
        const { cart_details } = this.props;
        let order_payload = {
            order: {
                email: cart_details.email,
                phone: cart_details.phone,
                shipping_address_attributes: {
                    name: cart_details.name,
                    phone: cart_details.phone,
                    state: cart_details.state,
                    city: cart_details.city,
                    address: cart_details.address,
                    zipcode: cart_details.zipcode,
                },
                order_items_attributes: []
            }
        };

        let ordered_items = cart_details.cart_items.filter((ordered_item) => { return ordered_item.quantity > 0; });

        ordered_items.map((ordered_item, index) => {
            order_payload.order.order_items_attributes[index] = Object.assign({}, { product_variant_id: ordered_item.product_variant_id, quantity: ordered_item.quantity });
        });
        this.props.actions.createOrder(order_payload);
    };

    render() {
        const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const phoneNumberError = isFieldTouched('phoneNumber') && getFieldError('phoneNumber');
        const emailIdError = isFieldTouched('emailId') && getFieldError('emailId');
        const addressError = isFieldTouched('address') && getFieldError('address');
        const stateError = isFieldTouched('state') && getFieldError('state');
        const cityError = isFieldTouched('city') && getFieldError('city');
        const zipcodeError = isFieldTouched('zipcode') && getFieldError('zipcode');

        return (
            <div className="shippingContainer">
                {this.props.cart_details.error}
                <Col xs={{ span: 24 }}>
                    <BackgroundImageHeader bg_current_page={heading} style={{ margin: '0px' }} current_page="about_us" />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12, offset: 6 }} className="form tb-pad-50">
                    <Col xs={{ span: 22, offset: 1 }} md={{ span: 16, offset: 4 }} className="contactFormContainer">
                        <Form layout="vertical" onSubmit={this.handleSubmit}>
                            <div className="mainHeading b-pad-30">Contact information</div>
                            <p>Name*</p>
                            <FormItem validateStatus={userNameError ? "error" : ""} help={userNameError || ''}>
                                {
                                    getFieldDecorator('userName', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <Input
                                            type="text"
                                            required
                                            name="name"
                                            className="form-control "
                                            placeholder="Enter your name"
                                            setfieldsvalue={this.props.cart_details.name}
                                            onChange={this.handleInput}
                                        />
                                    )
                                }
                            </FormItem>
                            <p>Email*</p>
                            <FormItem validateStatus={emailIdError ? "error" : ""} help={emailIdError || ''} >
                                {
                                    getFieldDecorator('emailId', {
                                        rules: [{ required: true, message: "Please enter your Email ID. " }, { type: "email", message: "Enter a valid Email ID" }],
                                    })(
                                        <Input
                                            type="email"
                                            required
                                            name="email"
                                            className="form-control "
                                            placeholder="Enter your email"
                                            setfieldsvalue="email"
                                            onChange={this.handleInput}
                                        />
                                    )
                                }
                            </FormItem>
                            <p>Phone*</p>
                            <FormItem validateStatus={phoneNumberError ? "error" : ""} help={phoneNumberError || ''}>
                                {
                                    getFieldDecorator('phoneNumber', {

                                        rules: [{ required: true, message: 'Please input your phone number!' }],
                                    })(
                                        <Input
                                            type="number"
                                            required
                                            name="phone"
                                            className="form-control "
                                            placeholder="Enter your 10 digit phone number"
                                            setfieldsvalue="phone"
                                            onChange={this.handleInput} />
                                    )
                                }
                            </FormItem>
                            <div className="mainHeading tb-pad-30">Shipping address</div>
                            <p>Address*</p>
                            <FormItem validateStatus={addressError ? "error" : ""} help={addressError || ''}>
                                {
                                    getFieldDecorator('address', {
                                        rules: [{ required: true, message: 'Please enter your address!' }],
                                    })(
                                        <textarea
                                            required
                                            rows=""
                                            name="address"
                                            className="textarea"
                                            placeholder=""
                                            setfieldsvalue="address"
                                            onChange={this.handleInput} />
                                    )
                                }
                            </FormItem>
                            <p>City*</p>
                            <FormItem validateStatus={cityError ? "error" : ""} help={cityError || ''} >
                                {
                                    getFieldDecorator('city', {
                                        rules: [{ required: true, message: "Please enter your City. " }, { type: "", message: "Enter a valid City" }],
                                    })(
                                        <Input
                                            type="text"
                                            required
                                            name="city"
                                            className="form-control "
                                            placeholder="Enter your city"
                                            setfieldsvalue="city"
                                            onChange={this.handleInput}
                                        />
                                    )
                                }
                            </FormItem>
                            <p>State*</p>
                            <FormItem validateStatus={stateError ? "error" : ""} help={stateError || ''} >
                                {
                                    getFieldDecorator('state', {
                                        rules: [{ required: true, message: "Please enter your State. " }, { type: "", message: "Enter a valid State" }],
                                    })(
                                        <Input
                                            type="text"
                                            required
                                            name="state"
                                            className="form-control "
                                            placeholder="Enter your State"
                                            setfieldsvalue="state"
                                            onChange={this.handleInput}
                                        />
                                    )
                                }
                            </FormItem>
                            <p>Zipcode*</p>
                            <FormItem validateStatus={zipcodeError ? "error" : ""} help={zipcodeError || ''}>
                                {
                                    getFieldDecorator('zipcode', {
                                        rules: [{ required: true, message: 'Please enter your Zipcode!' }],
                                    })(
                                        <Input
                                            type="text"
                                            required
                                            name="zipcode"
                                            className="form-control "
                                            placeholder="Enter your Zipcode"
                                            setfieldsvalue="zipcode"
                                            onChange={this.handleInput} />
                                    )
                                }
                            </FormItem>
                            <FormItem className="is-text-end full-width">
                                <div className="font-16 is-font-bold">Total Payable amount: <span className="is-font-normal text-primary l-mrgn-10">{this.props.cart_details.total_amount}</span></div>
                                <Button className="paymentButton" onClick={this.createOrder}>PROCEED TO PAYMENT
                                </Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Col>
            </div>
        );
    }
}

ShippingDetails.propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object,
    form: PropTypes.object,
    cart_details: PropTypes.object
};
const ShippingForm = Form.create()(ShippingDetails);
export default connect(mapStateToProps, mapDispatchToProps)(ShippingForm);
