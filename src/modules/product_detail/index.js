import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Col, Select, InputNumber, Button, Icon } from 'antd';

import './index.scss';

import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';
import * as productActions from '../../data/redux/product_details/actions';
import * as cartActions from '../../data/redux/cart_details/actions';

import ProductImage from './product_image';
import Tab from './tab_container';

const Option = Select.Option;
const FormItem = Form.Item;

function mapStateToProps(state) {
    return {
        product_details: state.product_details,
        cart_details: state.cart_details,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, productActions, cartActions), dispatch)
    };
}

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function handleBlur() { }

function handleFocus() { }

class ProductDetail extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
    }

    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.OUR_PRODUCT, CONSTANTS.appPages.OUR_PRODUCT);
        this.props.actions.getProductDetails(this.props.match.params.product_id);
    }

    componentDidMount() {
        this.props.form.validateFields();
    }

    handleChange = (value) => {
        let data = JSON.parse(value);
        this.props.actions.updateSelectedVarient(data);
    }

    handleQuantity = (value) => {
        this.props.actions.updateQuantity(value);
    }

    getProductID = (product_id) => {
        this.props.form.validateFields((err) => {
            if (!err) {
                this.updateCartItems(product_id);
                this.props.history.push('/cart');
            }
        });
    };

    updateCartItems(product_id) {
        const { product_details } = this.props;
        let data = {
            name: product_details.current_product.name,
            id: product_details.current_product.id,
            image: product_details.current_product.image,
            background_color: product_details.current_product.background_color,
            price: this.props.cart_details.selected_varient[product_id].price,
            product_variant_id: this.props.cart_details.selected_varient[product_id].id,
            variant_name: this.props.cart_details.selected_varient[product_id].name,
            quantity: this.props.cart_details.updated_quantity,
            amount: this.props.cart_details.updated_quantity * this.props.cart_details.selected_varient[product_id].price,
            count: 0,
        };
        this.props.actions.updateCartItems(data);
    }

    render() {
        const { getFieldDecorator, getFieldError, isFieldTouched, getFieldsError } = this.props.form;
        const selectError = isFieldTouched('select') && getFieldError('select');
        const quantityError = isFieldTouched('quantity') && getFieldError('quantity');
        const { product_details } = this.props;

        return (
            <Col xs={24} className="productDetailsContainer flex-column">
                <Col xs={{ span: 22, offset: 1 }} className="tb-pad-30">
                    <Col md={11}>
                        <ProductImage product_details={product_details} />
                    </Col>
                    {product_details.loaders && product_details.loaders.product_details_loading &&
                        <Col xs={24} className="loadingContainer flex-row flex-center pad-50">
                            <Icon className="loader font-24 font-primary" type="loading" />
                        </Col>
                    }
                    {product_details && product_details.current_product &&
                        <Col md={13} className="l-pad-50 addToCart">
                            <div className="">
                                <div className="mainHeading">{product_details.current_product.name}</div>
                                {false && 
                                    <Form className="form variants tb-mrgn-20">
                                        <FormItem validateStatus={selectError ? "error" : ""} help={selectError || ''}>
                                            {getFieldDecorator('select', {
                                                rules: [{ required: true, message: 'Please select variant!' }],
                                            })(
                                                <Select
                                                    showSearch
                                                    placeholder="WHITE CHOCOLATE & YOGURT"
                                                    onChange={this.handleChange}
                                                    onFocus={handleFocus}
                                                    onBlur={handleBlur}
                                                // defaultValue={{ key: 1}}
                                                >
                                                    {product_details.current_product.product_variants.map((product_variant, index) => {
                                                        return (
                                                            <Option key={index}
                                                                value={JSON.stringify(product_variant)}>{product_variant.name}
                                                            </Option>
                                                        );
                                                    })}
                                                </Select>
                                            )}
                                        </FormItem>
                                        <div className="flex flex-ac t-mrgn-10 flex-start">
                                            <FormItem validateStatus={quantityError ? "error" : ""} help={quantityError || ''} >
                                                {getFieldDecorator('quantity', {
                                                    rules: [{ required: true, message: 'Please enter quantity!' }],
                                                })(
                                                    <InputNumber className="flex-row flex-center" placeholder="Quantity"
                                                        min={0} onChange={this.handleQuantity} />
                                                )}
                                            </FormItem>
                                            <Button className="addButton is-cursor-ptr" onClick={() => this.getProductID(product_details.current_product.id)} disabled={hasErrors(getFieldsError())} >ADD TO CART</Button>
                                        </div>
                                    </Form>
                                }
                                <a href={product_details.current_product.product_link} target="_blank" >
                                    <Button className="addButton is-cursor-ptr t-mrgn-20">PRE-ORDER</Button>
                                </a>
                            </div>
                            <Tab product_details={this.props.product_details} />
                        </Col>
                    }
                    {product_details.loaders && product_details.loaders.product_details_load_err &&
                        <Col xs={24} className="loadingContainer flex-row flex-center pad-50">
                            <span className="font-18 font-primary">Some error has occured! please reload!</span>
                        </Col>
                    }
                </Col>
            </Col>
        );
    }
}

ProductDetail.propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object,
    product_details: PropTypes.object,
    match: PropTypes.object,
    cart_details: PropTypes.object,
    form: PropTypes.object
};

const SelectForm = Form.create()(ProductDetail);

export default connect(mapStateToProps, mapDispatchToProps)(SelectForm);
