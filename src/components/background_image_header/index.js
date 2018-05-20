import React, { Component } from 'react';
import './index.scss';
import PropTypes from 'prop-types';

export default class BackgroundImageHeader extends Component {
    render() {
        return (
            <div className={`flex-column flex-center backgroundContainer ${this.props.current_page}`} style={this.props.style}>
                <div className="is-absolute name">{this.props.bg_current_page}</div>
                <div className="border" />
            </div>
        );
    }
}

BackgroundImageHeader.propTypes = {
    bg_current_page: PropTypes.string,
    current_page: PropTypes.string,
    style: PropTypes.object
};
