import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import './index.scss';

import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';

import TestimonialCarousel from '../home/components/testimonial_carousel';

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions), dispatch)
    };
}

function mapStateToProps(state) {
    return {
        home_page_details: state.home_page_details,
    };
}

class AboutUs extends Component {

    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.ABOUT_US);
    }

    render() {
        return (
            <Row>
                <Col xs={{ span: 24 }} className="aboutUsContainer font-20">
                    <Col xs={{ span: 20, offset: 2 }} className="indent pad-50">
                        <div className="mainHeading">
                            <div>The Quest</div>
                        </div>
                        {/* <div className="brownBorder t-mrgn-20" /> */}
                        <div className="aboutUs">
                            <p className="t-mrgn-20">It is usually somewhere around evening when you feel those hunger pangs in the middle of the day! That is the time between your lunch and your dinner, the time interval around 4-6 pm. Although nutritionists and health experts emphasize the need to have a healthier snack at the time, it is not always possible to have it handy. Especially if you are a working professional in 10-12 hours of working culture.</p><br />
                            <p>Kushal Aradhya R, an Engineer - having a knack for food processing and healthy lifestyle decided upon himself to provide this fast-paced world with the perfect solution to these hunger pangs.</p><br />
                            <p>One of the core reasons of people indulging in unhealthy foods is the lack of time to prepare the nutrition rich diet and the second one, is the tedious task of carrying it all around. Other than that, the most common excuse to binging on junk food is the “taste” factor.</p><br />
                            <p>Extensive research and surveys conducted on various IT firms and BPOs confirmed the fact that nearly 72% of the corporate sector employees are prone to heart diseases and disorders due to such unhealthy binging.</p><br />
                            <p>Henceforth, the solution to this would be to invent something that is tasty, nutrient rich and is compact enough to carry anywhere. Something that is reliable enough to be nutritive and has great taste. And bingo! The precise answer to this a ‘bar’!</p><br />
                            <p>Thus, came to life the 4pm bar which has been made exclusively to meet these requirements. A quirky name but hits the correct spot to understanding the cause of its birth; 4 pm bar is loaded with enough nutrition that equals to a large bowl of fruits and veggies – enough to keep you going.</p><br />
                            <p>Evolved with the objective of providing nutrition to the corporates-the people who are the driving force of the country, 4pm bar relates to everyone from a student having long lectures to professionals working late hours.</p><br />
                            <p>4pm bar can outreach everyone such as professionals having deadlines and henceforth do not have time for food, health freaks having missed out their intake of nutrients, post-sports indulgence, rescuer to tricky situations like during travelling, during treks/hikes, long meeting hours, vehicle failure on highways and much more.</p>
                        </div>
                    </Col>
                    <Col xs={{ span: 24 }} className="t-mrgn-50 flex flex-center bg-white" >
                        <img className="is-relative full-width" src="https://res.cloudinary.com/poletalks/image/upload/v1523516711/4%20pm%20bar/grab-bars.png" />
                        <Col md={{ span: 4 }} className="buyButton"
                            onClick={() => { this.props.history.push('/our_product'); }}>
                            PRE-ORDER
                        </Col>
                    </Col>

                    <Col xs={{ span: 24 }}>
                        <TestimonialCarousel testimonials={this.props.home_page_details.testimonials} loaders={this.props.home_page_details.loaders}/>
                    </Col>
                </Col>
            </Row>
        );
    }
}

AboutUs.propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object,
    home_page_details: PropTypes.object,
    onUpdate: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
