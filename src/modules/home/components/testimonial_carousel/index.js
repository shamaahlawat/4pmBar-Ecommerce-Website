import React, { Component } from 'react';
import { Col, Carousel, Icon } from 'antd';
import PropTypes from 'prop-types';

import './index.scss';

export default class TestimonialCarousel extends Component {
    render() {
        const {testimonials, loaders} = this.props;
        return (
            <Col xs={{ span: 24 }} className="testimonialCarousel  tb-pad-50">
                <Carousel autoplay>
                    {testimonials.map((testimonial, index) => {
                        return (
                            <Col xs={{ span: 24 }} key={index} className="flex-column flex-center testimonialContainer font-26" >
                                <div className="mainHeading">WHAT PEOPLE SAY ABOUT 4PM BAR</div>
                                <img className="pad-20" src="https://res.cloudinary.com/poletalks/image/upload/v1521197820/4%20pm%20bar/quotes.png" height="70px" alt="" />
                                <div className="description is-text-center lr-pad-30">
                                    {testimonial.content}
                                </div>
                                <div className="color-brown b-pad-5">{testimonial.name}</div>
                            </Col>
                        );
                    })}
                </Carousel>

                {loaders && loaders.testimonial_list_loading &&
                    <Col xs={24} className="loadingContainer flex-row flex-center pad-50">
                        <Icon className="loader font-24 font-primary" type="loading" />
                    </Col>
                }

                {loaders && loaders.testimonial_list_load_err &&
                    <Col xs={24} className="loadingContainer flex-row flex-center pad-50">
                        <span className="font-18 font-primary">Some error has occured! please reload!</span>
                    </Col>
                }
            </Col>
        );
    }
}

TestimonialCarousel.propTypes = {
    testimonials: PropTypes.array,
    loaders: PropTypes.object
};

