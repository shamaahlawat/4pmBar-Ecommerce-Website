import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import './index.scss';

import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';
import * as homePageActions from '../../data/redux/home_page_details/actions';

import TestimonialCarousel from '../home/components/testimonial_carousel';

function mapStateToProps(state) {
    return {
        home_page_details: state.home_page_details,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, homePageActions), dispatch)
    };
}

class WhereToBuy extends Component {
    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.WHERE_TO_BUY);
        this.props.actions.getPurchaseDetails();
    }

    render() {
        return (
            <Row>
                <Col xs={{ span: 24 }} className="whereToBuyContainer">
                    <Col xs={{ span: 20, offset: 2 }} className="indent pad-50">
                        <div className="snacks">
                            <div className="mainHeading t-mrgn-30">WE ARE EXCLUSIVELY AVAILABLE@
                            </div>
                        </div>
                        <div className="brownBorder t-mrgn-20" />
                        <div className="flex flex-center flex-jsb t-mrgn-30 flex-wrap onlineSites">
                            {this.props.home_page_details.purchase_options.map((purchase_option, index) => {
                                return (
                                    <div key={index} className="purchaseDetails flex-column">
                                        <a href={purchase_option.link} target="_blank" ><img src={purchase_option.image} alt="" /></a>
                                    </div>
                                );
                            })}
                        </div>
                    </Col>
                    <Col xs={{ span: 24 }} className="t-mrgn-50 flex flex-center bg-white" >
                        <img className="is-relative full-width" src="https://res.cloudinary.com/poletalks/image/upload/v1523516711/4%20pm%20bar/grab-bars.png" />
                        <Col md={{ span: 4 }} className="bottom-50 is-absolute t-mrgn-20 pad-10 button flex flex-center white-border is-cursor-ptr" onClick={() => { this.props.history.push('/our_product'); }}>
                            PRE-ORDER
                        </Col>
                    </Col>
                    <Col xs={{ span: 24 }}>
                        <TestimonialCarousel testimonials={this.props.home_page_details.testimonials}  loaders={this.props.home_page_details.loaders}/>
                    </Col>
                </Col>
            </Row>
        );
    }
}

WhereToBuy.propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object,
    home_page_details: PropTypes.object,
    onUpdate: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(WhereToBuy);
