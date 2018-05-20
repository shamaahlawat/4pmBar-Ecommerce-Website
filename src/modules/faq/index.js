import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Icon } from 'antd';

// import './index.scss';

import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';
import * as homePageActions from '../../data/redux/home_page_details/actions';


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

class Faq extends Component {
    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.FAQ);
        this.props.actions.getFaqs();
    }

    render() {
        let { home_page_details } = this.props;
        return (
            <Col xs={24} className="whereToBuyContainer">
                <Col xs={{ span: 20, offset: 2 }} className="indent pad-50">
                    <div className="snacks">
                        <div className="mainHeading t-mrgn-30 is-text-center font-24">Frequently asked questions (FAQ)
                        </div>
                    </div>
                    <div className="brownBorder t-mrgn-20" />
                    {home_page_details.faqs.map((FAQ, index) => {
                        return (
                            <div className="snacks" key={index}>
                                <div className="mainHeading font-18 t-mrgn-30">{FAQ.question}
                                </div>
                                <div className="aboutUs">
                                    <p className="tb-mrgn-20">{FAQ.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    {home_page_details.loaders && home_page_details.loaders.faq_list_loading &&
                        <Col xs={24} className="loadingContainer flex-row flex-center pad-50">
                            <Icon className="loader font-24 font-primary" type="loading" />
                        </Col>
                    }

                    {home_page_details.loaders && home_page_details.loaders.faq_list_load_err &&
                        <Col xs={24} className="loadingContainer flex-row flex-center pad-50">
                            <span className="font-18 font-primary">Some error has occured! please reload!</span>
                        </Col>
                    }
                </Col>
            </Col>
        );
    }
}

Faq.propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object,
    home_page_details: PropTypes.object,
    onUpdate: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Faq);
