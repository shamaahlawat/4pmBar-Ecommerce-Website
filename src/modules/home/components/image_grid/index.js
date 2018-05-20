import React, { Component } from 'react';
import './index.scss';
import { Col, Icon } from 'antd';
import PropTypes from 'prop-types';

class ImageGrid extends Component {
    render() {
        const { images, loaders } = this.props;
        return (
            <div className="imageGridContainer flex-row flex-wrap">
                {images && images.length > 0 && images.map((image, index) => {
                    return(
                        <Col key={index} xs={12} sm={8} md={6} className="imageContainer is-cursor-ptr flex-row flex-center" style={{ backgroundImage: `url(${image.url})`}}>
                            <div className="full-flex flex-row flex-center middle">
                                <div className="text">{image.text}</div>
                            </div>
                        </Col>
                    );
                })}
                
                {loaders && loaders.get_pages_loading &&
                    <Col xs={24} className="loadingContainer flex-row flex-center pad-50">
                        <Icon className="loader font-24 font-primary" type="loading" />
                    </Col>
                }

                {loaders && loaders.get_pages_load_err &&
                    <Col xs={24} className="loadingContainer flex-row flex-center pad-50">
                        <span className="font-16 font-primary">Some error has occured! please reload!</span>
                    </Col>
                }
             </div >
        );
    }
}

ImageGrid.propTypes = {
    images: PropTypes.object,
    loaders: PropTypes.object,
};

export default ImageGrid;

