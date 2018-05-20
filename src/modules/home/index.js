import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Carousel, Icon } from 'antd';
import { Carousel as Slider } from 'react-responsive-carousel';

import './index.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { occasion_icons } from '../../data/assets/assetsurl';
import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';
import * as homePageActions from '../../data/redux/home_page_details/actions';

import ProductBenefits from './components/product_benefits';
import ImageGrid from './components/image_grid';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        home_page_details: state.home_page_details,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, homePageActions), dispatch)
    };
}

class Home extends Component {
    state = {
        animation_image: 'zoomIn',
        animation_text: 'fadeIn',
    };

    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.HOME);
        this.props.actions.getSliderImages();
        this.props.actions.getHomeProductList();
        this.props.actions.getPages();
    }

    getProductId = (id) => {
        this.props.history.push('/our_product/' + id);
    };

    getCurrentProductIndex = (index) => {
        this.setState({
            animation_image: "zoomOut",
            animation_text: "fadeOut"
        });
        this.props.actions.setCurrentProductDetail(index);        

        setTimeout(() => {
            this.setState({
                animation_image: "zoomIn",
                animation_text: "fadeIn"
            });
        }, 800);
    }

    render() {
        const { home_page_details, page_details } = this.props;
        const { animation_image, animation_text } = this.state;
        const main_slider_settings = {
            showThumbs: false,
            showArrows: false,
            showStatus: false,
            autoPlay: true,
            infiniteLoop: true,
            emulateTouch: true,
            dynamicHeight: true
        };
        const slidesToShow = (page_details.device_data.screen_type === 'xs') ? 2 : (page_details.device_data.screen_type === 'sm') ? 4 : (page_details.device_data.screen_type === 'md') ? 6 : 8;
        
        return (
            <div className="full-flex flex-column homeContainer">
                <Col xs={24} className="flex-column flex-center carouselSliderContainer">
                    {home_page_details.loaders && home_page_details.loaders.slider_list_loading &&
                        <Col xs={24} className="loadingContainer flex-row flex-center pad-50">
                            <Icon className="loader font-24 font-primary" type="loading" />
                        </Col>
                    }

                    {home_page_details.loaders && home_page_details.loaders.slider_list_load_err &&
                        <Col xs={24} className="loadingContainer flex-row flex-center pad-50">
                            <span className="font-16 font-primary">Some error has occured! please reload!</span>
                        </Col>
                    }

                    {home_page_details.home_page_sliders && home_page_details.home_page_sliders.length > 0 &&
                        <Slider {...main_slider_settings}>
                            {home_page_details.home_page_sliders.map((homePageSlider, index) => {
                                return (
                                    <Col xs={24} key={index} className="mainCarousalContainer flex-row flex-ac backgroundImage" style={{ backgroundImage: "url(" + homePageSlider.background_image + ")" }} >
                                        {homePageSlider.display_title && 
                                            <Col xs={18} md={16} lg={12} className="lr-pad-15 flex-column textContainer font-white">
                                                <div className="heading with-text-shadow font-52">{homePageSlider.title}</div>
                                                <div className="bottomBorder" />
                                                <div  className="description with-text-shadow tb-pad-30">{homePageSlider.description}</div>
                                                <Col xs={10} md={8} className="button" onClick={() => { this.props.history.push('/our_product'); }}>PRE-ORDER</Col>
                                            </Col>
                                        }
                                    </Col>
                                );
                            })}
                        </Slider>
                    }
                </Col>

                <Col xs={24} className="flex-row flex-center flex-wrap companyBannerContainer pad-20 tb-pad-50">
                    <Col xs={24} md={{ span: 9, offset: 1 }} className="pad-10 flex-row flex-jse">
                        <img className="companyBannerImages hungerSolution image-contain" src="https://res.cloudinary.com/poletalks/image/upload/v1522158763/4%20pm%20bar/hunger-solution.png" alt=""
                        />
                    </Col>
                    <Col xs={24} md={10} className="pad-10 flex-row flex-jc t-mrgn-30">
                        <img className="companyBannerImages chewNewBar image-contain" src="https://res.cloudinary.com/poletalks/image/upload/v1523435719/4%20pm%20bar/pmbar.png" alt="" />
                    </Col>
                </Col>

                <Col xs={24} className="placesContainer flex-column flex-center tb-pad-50" >
                    <div className="lr-pad-15 font-30 is-text-center">4PM BAR GOES GREAT WITH</div>
                    <Col xs={24} className="t-pad-20">
                        <Carousel slidesToShow={slidesToShow} autoplay={true} centerMode={true} dots={false} autoplaySpeed={2000} draggable={true}>
                            {occasion_icons.map((icon, index) => {
                                return (
                                    <div key={index} className="iconImageContainer">
                                        <img src={icon} />
                                    </div>
                                );
                            })}
                        </Carousel>
                    </Col>
                </Col>

                {home_page_details.current_product &&
                    <Col xs={24} className="productContainer lr-pad-15">
                        <Col md={{ span: 20, offset: 2 }} className="tb-pad-50 flex-column flex-center">
                            <Col xs={24} className="currentProductContainer flex-column flex-center">
                                <span className="hashtag font-20">{home_page_details.current_product.tagline}</span>
                                <img className={`productImage tb-pad-20 animated ${animation_image}`} src={home_page_details.current_product.image} />
                                <Col xs={24} className={`flex-column flex-center textAnimatedContainer animated ${animation_text}`}>
                                    <Col xs={24} className="brand is-text-center">{home_page_details.current_product.name}</Col>
                                    <Col xs={24} className="aboutProduct is-text-center font-20 opacity mrgn-10"> {home_page_details.current_product.description}</Col>
                                    <div className="flex-column flex-center">
                                        <span className="knowMoreButton lr-pad-20 tb-pad-5 is-cursor-ptr" onClick={() => this.getProductId(home_page_details.current_product.id)}>KNOW MORE</span>
                                    </div>
                                </Col>
                                <Col xs={12} className="border t-mrgn-30" />
                            </Col>

                            <Col xs={24} className="productsListContainer flex-row flex-jsa flex-wrap mrgn-30">
                                {home_page_details.products.map((product, index) => {
                                    return (
                                        <div key={product.id} className={`subProductContainer flex-row flex-center pad-20 is-cursor-ptr ${product.id === home_page_details.current_product.id ? 'active' : ''}`} onClick={() => { this.getCurrentProductIndex(index); }}>
                                            <img className="tb-mrgn-10 subProduct image-contain" src={product.image} alt="" />
                                        </div>
                                    );
                                })}
                            </Col>
                        </Col>

                        {home_page_details.loaders && home_page_details.loaders.home_product_list_loading &&
                            <Col xs={24} className="loadingContainer flex-row flex-center pad-50">
                                <Icon className="loader font-24 font-primary" type="loading" />
                            </Col>
                        }

                        {home_page_details.loaders && home_page_details.loaders.home_product_list_load_err &&
                            <Col xs={24} className="loadingContainer flex-row flex-center pad-50">
                                <span className="font-16 font-primary">Some error has occured! please reload!</span>
                            </Col>
                        }
                    </Col>
                }

                {home_page_details && home_page_details.page_properties.length > 0 &&
                    <Col xs={24} className="productBenefitsContainer">
                        <ProductBenefits page_properties={home_page_details.page_properties} loaders={home_page_details.loaders} />
                    </Col>
                }

                <Col xs={24} className="flex-row flex-center bg-white whereToBuyContainer is-relative">
                    <img className="full-width max-full-width" src="https://res.cloudinary.com/poletalks/image/upload/v1523516711/4%20pm%20bar/grab-bars.png" />
                    <Col xs={12} md={6} lg={5} className="buyButton" onClick={() => { this.props.history.push('/where_to_buy'); }}>WHERE TO BUY</Col>
                </Col>

                {home_page_details.images.length > 0 &&
                    <Col xs={24} className="imagegrid">
                        <ImageGrid image={home_page_details.images} loaders={home_page_details.loaders}/>
                    </Col>
                }
            </div>
        );
    }
}

Home.propTypes = {
    actions: PropTypes.object,
    home_page_details: PropTypes.object,
    product: PropTypes.object,
    history: PropTypes.object,
    page_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
