import React, { Component } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { Button, Select } from 'antd';
import * as CONSTANTS from '../../../../data/config/constants';
import * as pageActions from '../../../../data/redux/page_details/actions';
import * as cartActions from '../../../../data/redux/cart_details/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Option = Select.Option;

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, cartActions), dispatch)
    };
}
function mapStateToProps(state) {
    return {
        product_details: state.product_details,
        cart_details: state.cart_details,
    };
}

class AdditionalItems extends Component {

    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.CART, CONSTANTS.appPages.CART);
    }

    handleChange = (value) => {
        let data = JSON.parse(value);
        this.props.actions.updateSelectedVarient(data);
    }


    getProductID = (product_id) => {
        const { cart_details } = this.props;
        let data = {
            background_color: cart_details.selected_varient[product_id].background_color,
            image: cart_details.selected_varient[product_id].image,
            price: cart_details.selected_varient[product_id].price,
            name: cart_details.selected_varient[product_id].product_name,
            variant_name: cart_details.selected_varient[product_id].name,
            product_variant_id: cart_details.selected_varient[product_id].id,
            quantity: 1,
            amount: cart_details.selected_varient[product_id].price
        };
        this.props.actions.updateCartItems(data);
    };

    render() {
        return (
            <div className="additionalProducts flex-column flex-center tb-pad-50">
                <div>YOU MAY ALSO LIKE</div>
                {
                    this.props.product_details.products.map((product, index) => {
                        return (
                            <div className="border" key={index}>
                                <div className="imageContainer t-pad-40">
                                    <img src={product.image} />
                                </div>
                                <div className="full-width is-text-center tb-pad-20 chocolateName">
                                    {product.name}
                                </div>
                                <div className="flex flex-center">
                                    <Select
                                        showSearch
                                        placeholder="select chocolates"
                                        optionFilterProp="children"
                                        onChange={this.handleChange}
                                    >
                                        {
                                            product.product_variants.map((product_variant, index) => {
                                                return (
                                                    <Option key={index} value={JSON.stringify(product_variant)}>{product_variant.name}
                                                    </Option>
                                                );
                                            })}
                                    </Select>
                                    <Button className="paymentButton"
                                        onClick={() => this.getProductID(product.id)}>
                                        ADD
                                    </Button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

AdditionalItems.propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object,
    product_details: PropTypes.object,
    cart_details: PropTypes.object,
    form: PropTypes.object
};


export default connect(mapStateToProps, mapDispatchToProps)(AdditionalItems);
