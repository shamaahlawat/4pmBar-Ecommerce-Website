import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { Col } from 'antd';
import { icons } from '../../data/assets/assetsurl';

class ConfirmationPage extends Component {

    render() {
        return (
            <div className="confirmationContainer flex-row flex-center">
                <Col xs={{ span: 16 }} className="flex-column flex-center">
                    <div className="image is-text-center"><img src={icons.success_icon} alt="" />
                    </div>
                    <div className="orderSuccess is-text-center tb-pad-40">
                        Your order has been successfully placed and check your email for more details. For queries feel free to contact us at+919739807579 or email us at kushalaradhya@gmail.com
                    </div>
                    <div className="button"
                        onClick={() => { this.props.history.push('/home'); }}>GO TO HOME
                    </div>
                </Col>
            </div>
        );
    }
}

ConfirmationPage.propTypes = {
    history: PropTypes.object,
    actions: PropTypes.object
};

export default ConfirmationPage;
