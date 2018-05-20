import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Icon } from 'antd';

import './index.scss';

import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';
import * as homePageActions from '../../data/redux/home_page_details/actions';
import * as productActions from '../../data/redux/product_details/actions';

import TestimonialCarousel from '../home/components/testimonial_carousel';
import BackgroundImageHeader from '../../components/background_image_header';

function mapStateToProps(state) {
    return {
        product_details: state.product_details,
        home_page_details: state.home_page_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, productActions, homePageActions), dispatch)
    };
}

let heading = 'OUR BARS';

class OurProduct extends Component {

    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.OUR_PRODUCT, CONSTANTS.appPages.OUR_PRODUCT);
        this.props.actions.getProductsList();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    getProductId = (id) => {
        this.props.history.push('/our_product/' + id);
    };

    render() {
        let { product_details, home_page_details } = this.props;
        return (
            <Col xs={24} className="ourProductContainer flex-column">
                <BackgroundImageHeader bg_current_page={heading} style={{ margin: '0px' }} />

                <Col xs={24} className="flex-column">
                    {product_details.loaders && product_details.loaders.product_list_loading &&
                        <Col xs={24} className="loadingContainer flex-row flex-center pad-50">
                            <Icon className="loader font-24 font-primary" type="loading" />
                        </Col>
                    }

                    {product_details.products && 
                        <Col xs={24} className="flex-row flex-wrap flex-ac">
                            {product_details.products.map((product, index) => {
                                return (
                                    <Col md={12} xs={24} id={`product_${index}`} key={index} className="darkChocolate font-24 pad-15">
                                        <div className="flex-column flex-center bg-color chocolateDetails" onClick={() => this.getProductId(product.id)}>
                                            <Col xs={24} className="img-container flex flex-jc lr-pad-15">
                                                <img className="productImage image-contain" src={product.image} />
                                            </Col>
                                            <div className="pad-15 chocolate">{product.name}</div>
                                            <div className="button">PRE-ORDER</div>
                                            <style>
                                                {`#product_${index} .chocolateDetails:hover {
                                                        background-color: ${product.background_color}
                                                }`}
                                            </style>
                                        </div>
                                    </Col>
                                );
                            })}
                        </Col>
                    }
                
                    {product_details.loaders && product_details.loaders.product_list_load_err &&
                        <Col xs={24} className="loadingContainer flex-row flex-center pad-50">
                            <span className="font-18 font-primary">Some error has occured! please reload!</span>
                        </Col>
                    }
                </Col>

                <Col xs={24}>
                    <img className="img-contain" src="https://res.cloudinary.com/poletalks/image/upload/v1522161519/4%20pm%20bar/rich-in-mineral.png" alt="" />
                </Col>

                <Col xs={24}>
                    <TestimonialCarousel testimonials={home_page_details.testimonials} loaders={home_page_details.loaders}/>
                </Col>
            </Col>
        );
    }
}

OurProduct.propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object,
    product_details: PropTypes.object,
    home_page_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(OurProduct);
