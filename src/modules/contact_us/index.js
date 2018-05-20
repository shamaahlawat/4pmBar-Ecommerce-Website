import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Row, Col, Form, Icon } from 'antd';

import './index.scss';
import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';
import * as contactPageActions from '../../data/redux/contact_details/actions';

import ContactForm from './contactForm';
const ContactDetailsForm = Form.create()(ContactForm);
import BackgroundImageHeader from '../../components/background_image_header';

function mapStateToProps(state) {
    return {
        contact_details: state.contact_details,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, contactPageActions), dispatch)
    };
}

class ContactUs extends Component {
    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.CONTACT_US, CONSTANTS.appPages.CONTACT_US);
        this.props.actions.getCompanyContactDetails();
    }

    render() {
        const { contact_details, actions, history } = this.props;
        return (
            <Row>
                <Col xs={24} className="contactUsContainer b-pad-40">
                    <Col xs={24}><BackgroundImageHeader bg_current_page="CONTACT US" /></Col>

                    <Col xs={24} md={12} className="flex-column flex-center nakaAddress">
                        {contact_details.loaders && contact_details.loaders.company_contact_details_loaded && contact_details.about_us &&
                            <Col xs={24} className="flex-column">
                                <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC8DI41WuYEMW0vRgIoACPDR5WvTTwg4lM&q=Naka+Foods+Pvt.+Ltd.+in+Mysuru+Karnataka" width="100%" height="323" frameBorder="0" />
                                <div className="companyName tb-mrgn-20">NAKA FOODS</div>
                                <div className="flex address font-18">
                                    <div className="r-mrgn-10">
                                        <img src="https://res.cloudinary.com/poletalks/image/upload/v1521277828/placeholder_jbzeg2.png" alt="" />
                                    </div>
                                    <div>{contact_details.about_us.address}</div>
                                </div>
                                <div className="flex address tb-mrgn-20 font-18">
                                    <div className="r-mrgn-10">
                                        <img src="https://res.cloudinary.com/poletalks/image/upload/v1521277828/call-answer_gqlgk3.png" alt="" />
                                    </div>
                                    <div>{contact_details.about_us.phone}</div>
                                </div>
                                <div className="flex address font-18">
                                    <div className="r-mrgn-10">
                                        <img src="https://res.cloudinary.com/poletalks/image/upload/v1521277828/close-envelope_tteehc.png" alt="" />
                                    </div>
                                    <div>{contact_details.about_us.email}</div>
                                </div>
                            </Col>
                        }
                        {contact_details.loaders && contact_details.loaders.company_contact_details_loading &&
                            <Col xs={24} className="loadingContainer flex-row flex-center pad-50">
                                <Icon className="loader font-24 font-primary" type="loading" />
                            </Col>
                        }
                        {contact_details.loaders && contact_details.loaders.company_contact_details_load_err &&
                            <Col xs={24} className="loadingContainer flex-row flex-center pad-50">
                                <span className="font-16 font-primary">Some error has occured! please reload!</span>
                            </Col>
                        }
                    </Col>

                    <Col xs={24} md={12} className="contactUsFormContainer">
                        <ContactDetailsForm history={history} contact_details={contact_details} actions={actions} />
                    </Col>
                </Col>
            </Row>
        );
    }
}

ContactUs.propTypes = {
    actions: PropTypes.object,
    contact_details: PropTypes.object,
    history: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
