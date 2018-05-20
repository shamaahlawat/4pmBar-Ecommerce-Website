
import React, { Component } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { Row, Col, Tabs } from 'antd';

const TabPane = Tabs.TabPane;
class Tab extends Component {
    render() {
        const { product_details } = this.props;
        return (
            <Row>
                <Col xs={{ span: 24 }} className="tabContainer t-pad-30">
                    <div className="card-container">
                        <Tabs type="card">
                            {
                                product_details.current_product.product_properties.map((product_property, index) => {
                                    return (
                                        <TabPane key={index} tab={product_property.category_title}>
                                            {product_property.category_info.map((category_info, index) => {
                                                return (
                                                    <div key={index} className="description t-mrgn-50">
                                                        {category_info.title &&
                                                            <div className="title">{category_info.title}<br />
                                                            </div>
                                                        }
                                                        {category_info.image !== null &&
                                                            <div className="imageContainer"><img className="img-contain" src={category_info.image} />
                                                            </div>
                                                        }
                                                        <div className="description"> {category_info.description}<br /></div><br />
                                                    </div>
                                                );
                                            })}
                                        </TabPane>
                                    );
                                })}
                        </Tabs>
                    </div>
                </Col>
            </Row>
        );
    }
}

Tab.propTypes = {
    history: PropTypes.object,
    product_details: PropTypes.object
};

export default Tab;

