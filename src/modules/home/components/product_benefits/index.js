import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Icon } from 'antd';

import './index.scss';

export default class ProductBenefits extends Component {
    render() {
        const { page_properties, loaders } = this.props;
        return (
            <Row className="benefitsContainer flex-column">
                {page_properties.map((product, index) => {
                    return (
                        <Col xs={{ span: 24 }} key={index} className={`mainContainer b-border flex-row flex-wrap ${index % 2 === 0 ? 'leftAlign' : 'rightAlign'}`}>
                            <Col xs={24} md={12} className="imageSection">
                                <img className="full-width max-full-width" src={product.image} alt="" />
                            </Col>
                            <Col xs={24} md={12} className="tb-pad-15 content flex-column">
                                <Col xs={{ span: 20, offset: 2 }} className="full-flex flex-column flex-jc subContent">
                                    <Col xs={18} sm={12} md={8} lg={6} className="elements greenBorder tb-mrgn-10">{product.title}</Col>
                                    <div className="t-mrgn-10 description">
                                        <ul className="">
                                            {product.description.split(/\n/).map((line, index) => {
                                                return (
                                                    (line.length >  0) && <li key={index}>{line}</li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </Col>
                            </Col>
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
            </Row >
        );
    }
}

ProductBenefits.propTypes = {
    page_properties: PropTypes.array,
    loaders: PropTypes.object
};


