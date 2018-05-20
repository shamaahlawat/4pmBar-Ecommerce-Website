import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import './index.scss';
import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions), dispatch)
    };
}

class TermsConditions extends Component {
    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.TERMS);
    }

    render() {
        return (
            <Row>
                <Col xs={{ span: 24 }} className="whereToBuyContainer">
                    <Col xs={{ span: 20, offset: 2 }} className="indent pad-50">
                        <div className="mainHeading t-mrgn-30 is-text-center termsConditions">TERMS AND CONDITIONS</div>
                        <div className="snacks">
                            <div className="mainHeading t-mrgn-30">OWNERSHIP OF SITE; AGREEMENT TO TERMS OF USE</div>
                            <div className="aboutUs">
                                <p className="tb-mrgn-20">These Terms and Conditions of Use ("Terms of Use") govern your access to and the use, whether as a guest or a registered user, of the website located at www.one1brands.com and all associated websites linked to www.one1brands.com (collectively, the "Site") provided by ONE Brands, LLC., its parents, subsidiaries, and/or affiliates (collectively, "ONE Brands"). BY USING THE SITE, YOU ACCEPT AND AGREE TO BE BOUND AND ABIDE BY THESE TERMS OF USE. IF YOU DO NOT AGREE TO THESE TERMS OF USE, DO NOT USE THE SITE.</p>
                            </div>
                            <div className="mainHeading t-mrgn-30">PERMITTED USE OF THE SITE AND CONTENT
                            </div>
                            <div className="aboutUs">
                                <p className="tb-mrgn-20">These Terms and Conditions of Use ("Terms of Use") govern your access to and the use, whether as a guest or a registered user, of the website located at www.one1brands.com and all associated websites linked to www.one1brands.com (collectively, the "Site") provided by ONE Brands, LLC., its parents, subsidiaries, and/or affiliates (collectively, "ONE Brands"). BY USING THE SITE, YOU ACCEPT AND AGREE TO BE BOUND AND ABIDE BY THESE TERMS OF USE. IF YOU DO NOT AGREE TO THESE TERMS OF USE, DO NOT USE THE SITE.</p>
                            </div>
                            <div className="mainHeading t-mrgn-30">PROHIBITED USES
                            </div>
                            <div className="aboutUs">
                                <p className="tb-mrgn-20">These Terms and Conditions of Use ("Terms of Use") govern your access to and the use, whether as a guest or a registered user, of the website located at www.one1brands.com and all associated websites linked to www.one1brands.com (collectively, the "Site") provided by ONE Brands, LLC., its parents, subsidiaries, and/or affiliates (collectively, "ONE Brands"). BY USING THE SITE, YOU ACCEPT AND AGREE TO BE BOUND AND ABIDE BY THESE TERMS OF USE. IF YOU DO NOT AGREE TO THESE TERMS OF USE, DO NOT USE THE SITE.</p>
                            </div>
                        </div>
                    </Col>
                </Col>
            </Row>
        );
    }
}

TermsConditions.propTypes = {
    actions: PropTypes.object
};

export default connect(null, mapDispatchToProps)(TermsConditions);
