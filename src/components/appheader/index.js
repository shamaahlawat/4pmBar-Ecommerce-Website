import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col } from 'antd/lib/grid';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as pageActions from '../../data/redux/page_details/actions';
import * as CONSTANTS from '../../data/config/constants';
import { icons } from '../../data/assets/assetsurl';

import './index.scss';
import SideNavbar from './sidenavbar';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        user_details: state.user_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions), dispatch)
    };
}

class AppHeader extends Component {
    loadPath = (path) => {
        if (path === '/blog') {
            window.location.href = "https://medium.com/@namaste_92841";
        } else {
            this.props.history.push(path);
        }
    }

    render() {
        let { page_details } = this.props;

        let navItems = [
            // { key: 1, title: 'HOME', page: CONSTANTS.appPages.HOME, path: '/' },
            { key: 2, title: 'OUR PRODUCTS', page: CONSTANTS.appPages.OUR_PRODUCT, path: '/our_product' },
            { key: 3, title: 'OUR STORY', page: CONSTANTS.appPages.ABOUT_US, path: '/about_us' },
            { key: 4, title: 'WHERE TO BUY', page: CONSTANTS.appPages.WHERE_TO_BUY, path: '/where_to_buy' },
            { key: 5, title: 'CONTACT US', page: CONSTANTS.appPages.CONTACT_US, path: '/contact_us' },
            { key: 6, title: 'FAQ', page: CONSTANTS.appPages.FAQ, path: '/faqs' },
            { key: 7, title: 'BLOG', page: CONSTANTS.appPages.BLOG, path: '/blog' },
            { key: 8, title: 'Cart', page: CONSTANTS.appPages.CART, path: '/cart' }
        ];

        return (
            <Col xs={{ span: 24 }} className="appHeaderContainer lr-pad-15 flex-row flex-jsb">
                <Col className="flex-row flex-jsb flex-ac is-cursor-ptr animated zoomIn">
                    <img className="animated zoomIn logo" src={icons.header_logo} alt="" onClick={() => { this.loadPath('/'); }} />
                </Col>

                {page_details.device_data.screen_width <= 768 &&
                    <div className="sidenavbar">
                        <SideNavbar page_details={page_details} nav_items={navItems} loadPath={this.loadPath} />
                    </div>
                }

                {page_details.device_data.screen_width > 768 &&
                    <Col className="flex-row flex-jfe flex-ac flex-wrap linkContainer is-cursor-ptr">
                        {navItems.map(navItem => {
                            return (
                                <div key={navItem.key} className={classNames("flex-row flex-center link lr-pad-10", { "active": page_details.current_page === navItem.page })} onClick={() => this.loadPath(navItem.path)}>{navItem.title}
                                </div>
                            );
                        })}
                        <div className="flex-row socialLinks flex-wrap tb-pad-5">
                            <a className="link" href="https://www.facebook.com/4PMBars/" target="_blank">
                                <img className="iconLinkImg" src="https://res.cloudinary.com/poletalks/image/upload/v1521193410/4%20pm%20bar/facebook_logo.png" alt="" />
                            </a>
                            <a className="link" href="https://www.instagram.com/4pmbar/?hl=en" target="_blank"><img className="iconLinkImg" src="https://res.cloudinary.com/poletalks/image/upload/v1521193410/4%20pm%20bar/instagram_logo.png" alt="" /></a>
                            <a className="link" href="https://twitter.com/4PMBar" target="_blank"><img className="iconLinkImg" src="https://res.cloudinary.com/poletalks/image/upload/v1521193411/4%20pm%20bar/twitter_logo.png" alt="" /></a>
                        </div>
                    </Col>
                }
            </Col>
        );
    }
}

AppHeader.propTypes = {
    history: PropTypes.object,
    page_details: PropTypes.object,
    user_details: PropTypes.object,
    actions: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(AppHeader);
