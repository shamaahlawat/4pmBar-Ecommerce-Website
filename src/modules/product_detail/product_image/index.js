import React, { Component } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { Row, Col, } from 'antd';

class ProductImage extends Component {
    constructor(){
        super();
        this.state = {
            current_image: undefined
        };
    }

    componentWillReceiveProps(nxtProps){
        if(nxtProps.product_details !== this.props.product_details && nxtProps.product_details.current_product && nxtProps.product_details.current_product.images.length > 0){
           this.setState({
                images: nxtProps.product_details.current_product.images,
                current_image: nxtProps.product_details.current_product.image
            });
        }
    }

    onImgClick = (current_image) => {
        this.setState({
            current_image
        });
    }

    render() {
        const { product_details } = this.props;
        return (
            <Row>
                {product_details.current_product &&
                    product_details.current_product.image.length > 0 &&
                    <Col xs={{ span: 24 }} className="ProductImageContainer">
                        <div className="imageContainer pad-10 flex-row flex-center">
                            <img className="productImage" src={this.state.current_image} />
                        </div>
                        <div className="similarImages flex-wrap flex tb-mrgn-30">
                            <div className={`is-cursor-ptr border flex-row flex-center pad-10 b-mrgn-10 imageStyle r-mrgn-10 ${this.state.current_image === product_details.current_product.image && 'active'}`}>
                                <img className="productImage" src={product_details.current_product.image} alt="" onClick={() => this.onImgClick(product_details.current_product.image)} />
                            </div>
                            {product_details.current_product.images.map((image, index) => {
                                return (
                                    <div className={`is-cursor-ptr border flex-row flex-center pad-10 b-mrgn-10 imageStyle r-mrgn-10 ${this.state.current_image === image.url && 'active'}`} key={index}>
                                        <img className="img-contain" src={image.url} alt="" onClick={() => this.onImgClick(image.url)}/>
                                    </div>
                                );
                            })}
                        </div>
                    </Col>
                }
            </Row>
        );
    }
}

ProductImage.propTypes = {
    history: PropTypes.object,
    product_details: PropTypes.object
};

export default ProductImage;
