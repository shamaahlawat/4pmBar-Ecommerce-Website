import React, { Component } from 'react';
import { slide as Sidebar } from 'react-burger-menu';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon, Col } from 'antd';

import './index.scss';

export default class SideNavbar extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false
        };
    }

    loadPath = (path) => {
        this.setState({
            isOpen: false
        });
        this.props.loadPath(path);
    };

    render() {
        const { page_details, nav_items } = this.props;
        return (
            <div className="sideNavbarContainer">
                <Sidebar isOpen={this.state.isOpen} right customBurgerIcon={<span><Icon type="bars" /></span>}>
                    <div className="is-relative sideBarContent">
                        <Col xs={24} className="pad-10 full-flex flex-column menulist">
                            {nav_items.map(navItem => {
                                return (
                                    <div key={navItem.key} className={classNames("flex-row full-flex link is-cursor-ptr", { "is-font-bold active": page_details.current_page === navItem.page })} onClick={() => this.loadPath(navItem.path)}>{navItem.title}
                                    </div>
                                );
                            })}
                            <div className="flex-row flex-wrap tb-pad-5">
                                <a className="link" href="https://www.instagram.com/4pmbar/?hl=en" target="_blank"><img className="iconLinkImg" src="https://res.cloudinary.com/poletalks/image/upload/v1521193410/4%20pm%20bar/facebook_logo.png" alt="" /></a>
                                <a className="link" href="https://www.instagram.com/4pmbar/?hl=en" target="_blank"><img className="iconLinkImg" src="https://res.cloudinary.com/poletalks/image/upload/v1521193410/4%20pm%20bar/instagram_logo.png" alt="" /></a>
                                <a className="link" href="https://twitter.com/4PMBar" target="_blank"><img className="iconLinkImg" src="https://res.cloudinary.com/poletalks/image/upload/v1521193411/4%20pm%20bar/twitter_logo.png" alt="" /></a>
                            </div>
                        </Col>
                    </div>
                </Sidebar>
            </div>
        );
    }
}

SideNavbar.propTypes = {
    page_details: PropTypes.object,
    nav_items: PropTypes.array,
    loadPath: PropTypes.func
};
