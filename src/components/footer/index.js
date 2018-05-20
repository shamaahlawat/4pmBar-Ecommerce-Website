import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, input, Form, message } from 'antd';

import './index.scss';
import { icons } from '../../data/assets/assetsurl';

export default class Footer extends Component {
    constructor() {
        super();
        this.state = {
            customer_email: '',
            customer_email_valid: false,
            subscription_popup_visible: false,
            subscription_popup_animation: 'slideInRight'
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                subscription_popup_visible: true
            });
        }, 45000);
    }

    componentWillReceiveProps(nxtProps) {
        if (nxtProps.contact_details && nxtProps.contact_details.loaders && this.props.contact_details && this.props.contact_details.loaders && nxtProps.contact_details.loaders.subscribe_with_email_loaded !== this.props.contact_details.loaders.subscribe_with_email_loaded && nxtProps.contact_details.loaders.subscribe_with_email_loaded === true) {
            message.success("Yay! There you go. Thankyou for your subscription.");
        }
    }

    onEmailUpdate = (e) => {
        let re = /\S+@\S+\.\S+/;
        let email = e.target.value;
        this.setState({
            customer_email: email,
            customer_email_valid: re.test(email)
        });
    }

    onEmailSubmit = (type) => {
        if (this.state.customer_email_valid) {
            let subscription = {
                subscription: {
                    email: this.state.customer_email
                }
            };
            this.props.actions.submitEmailSubscription(subscription);
            this.setState({
                customer_email: '',
                customer_email_valid: false
            });
            if (type === 'popup') {
                this.closeSubscriptionPopup();
            }
        } else {
            message.warning("Please validate the email you have entered!");
        }
    }

    closeSubscriptionPopup = () => {
        this.setState({
            subscription_popup_animation: 'slideOutRight'
        }, () => {
            setTimeout(() => {
                this.setState({
                    subscription_popup_visible: false
                });
            }, 800);
        });
    }

    render() {
        const { subscription_popup_animation, subscription_popup_visible, customer_email, customer_email_valid } = this.state;

        return (
            <Col xs={24} className="appFooterContainer t-pad-30 flex-column flex-center">
                <Col xs={24} className="footerBodyContainer flex-jsb flex pad-15">
                    <Col className="tb-pad-15">
                        <div className=""><img src={icons.footer_logo} /></div>
                    </Col>
                    <Col className="tb-pad-15">
                        <div className="footerElements is-cursor-ptr flex-column">
                            <span className="link b-pad-5" onClick={() => { this.props.history.push('/'); }}>HOME</span>
                            <span className="link b-pad-5" onClick={() => { this.props.history.push('/our_product'); }}>OUR PRODUCTS</span>
                            <span className="link b-pad-5" onClick={() => { this.props.history.push('/about_us'); }}>OUR STORY</span>
                            <span className="link b-pad-5" onClick={() => { this.props.history.push('/where_to_buy'); }}>WHERE TO BUY</span>
                            <span className="link b-pad-5" onClick={() => { this.props.history.push('/contact_us'); }}>CONTACT US</span>
                            <span className="link b-pad-5" onClick={() => { this.props.history.push('/faqs'); }}>FAQ</span>
                            <span className="link b-pad-5" onClick={() => { window.location.href = "https://medium.com/@namaste_92841"; }}>BLOG</span>
                            <span className="link b-pad-5" onClick={() => { this.props.history.push('/terms-conditions'); }}>TERMS & CONDITIONS</span>
                        </div>
                    </Col>
                    <Col xs={{ span: 16 }} md={{ span: 6 }} className="tb-pad-15">
                        <p className="b-pad-10">Subscribe to receive news about new products & special offers!</p>
                        <div className="enterEmail lr-pad-10">
                            <Form className="flex-row flex-ac flex-jsa t-pad-5 ">
                                <input
                                    type="email"
                                    required
                                    name="email"
                                    className="form-control input full-width full-flex"
                                    placeholder="Enter your email"
                                    onChange={this.onEmailUpdate}
                                    value={customer_email}
                                    style={{ background: "black !important" }}
                                />
                                <div className="l-pad-10 flex-ac flex is-cursor-ptr" onClick={this.onEmailSubmit}>
                                    <img src="https://res.cloudinary.com/poletalks/image/upload/v1521193411/4%20pm%20bar/right-arrow.png" />
                                </div>
                            </Form>
                        </div>
                    </Col>
                    <Col xs={{ span: 10 }} md={{ span: 3 }} className="tb-pad-15 is-cursor-ptr">
                        <p className="footerElements b-pad-10">FOLLOW US</p>
                        <div className="socialLinks flex flex-jsb t-mrgn-10">
                            <a href="https://www.facebook.com/4PMBars/" target="_blank"><img src="https://res.cloudinary.com/poletalks/image/upload/v1521193410/4%20pm%20bar/facebook_logo.png" alt="" /></a>
                            <a href="https://www.instagram.com/4pmbar/?hl=en" target="_blank"><img src="https://res.cloudinary.com/poletalks/image/upload/v1521193410/4%20pm%20bar/instagram_logo.png" alt="" /></a>
                            <a href="https://twitter.com/4PMBar" target="_blank"><img src="https://res.cloudinary.com/poletalks/image/upload/v1521193411/4%20pm%20bar/twitter_logo.png" alt="" /></a>
                        </div>
                    </Col>
                </Col>
                <Col xs={{ span: 24 }} className="flex-column flex-center lr-pad-15 tb-pad-10 copyright borderTop">
                    <span className="flex-row flex-center">
                        <span className="is-text-center font-10">Made in India</span>
                        <span className="l-mrgn-10"><img src="https://res.cloudinary.com/poletalks/image/upload/v1521193410/4%20pm%20bar/india.png" alt="" /></span>
                    </span>
                    <span className="is-text-center font-10 rights">4PM BAR © 2017 | All Rights Reserved
                    </span>
                </Col>

                {subscription_popup_visible &&
                    <div className="subscriptionPopupContainer">
                        <div className={`subscriptionPopup flex-column is-relative animated ${subscription_popup_animation}`}>
                            <div className="closeBtn is-absolute bg-white is-cursor-ptr font-18 flex-row flex-center" onClick={this.closeSubscriptionPopup}>x</div>
                            <div className="headerContainer flex-row flex-ac pad-15">
                                <div className="iconContainer pad-20">
                                    <img src={icons.newsletter_icon} className="image-contain" />
                                </div>
                                <div className="flex-column color-white">
                                    <span className="is-font-bold font-18">Subscribe to 4PM BAR</span>
                                    <span className="font-14">Subscribe with your email now to get exclusive introductory discounts, offers and more!</span>
                                </div>
                            </div>
                            <div className="emailInputContainer flex-row lr-pad-15 tb-pad-20">
                                <input type="email" placeholder="Email" className={`full-flex ${!customer_email_valid ? 'error' : ''}`} onChange={this.onEmailUpdate} value={customer_email} />
                                <div className="joinBtnContainer l-pad-15">
                                    <button className="joinBtn bg-white tb-pad-5 lr-pad-30" disabled={!customer_email_valid || !customer_email} onClick={() => this.onEmailSubmit("popup")}>JOIN</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </Col>
        );
    }
}

Footer.propTypes = {
    actions: PropTypes.object,
    history: PropTypes.object,
    contact_details: PropTypes.object,
    home_page_details: PropTypes.object,
};
