import React, { Component } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import * as contactPageActions from '../../data/redux/contact_details/actions';
import './index.scss';

const FormItem = Form.Item;

// function hasErrors(fieldsError) {
//     return Object.keys(fieldsError).some(field => fieldsError[field]);
// }

export default class ShippingDetails extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.form.validateFields();
    }

    render() {
        const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const phoneNumberError = isFieldTouched('phoneNumber') && getFieldError('phoneNumber');
        const emailIdError = isFieldTouched('emailId') && getFieldError('emailId');
        const messageError = isFieldTouched('message') && getFieldError('');

        return (
            <Row>
                <Col xs={{ span: 22, offset: 1 }} md={{ span: 14, offset: 3 }} className="contactFormContainer">
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                        <p>Name*</p>
                        <FormItem validateStatus={userNameError ? "error" : ""} help={userNameError || ''}>
                            {
                                getFieldDecorator('userName', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input
                                        type="text"
                                        required
                                        name="name"
                                        className="form-control "
                                        placeholder=""
                                        setfieldsvalue="name"
                                        onChange={this.handleInput}
                                    />
                                )
                            }
                        </FormItem>
                        <p>Email*</p>
                        <FormItem validateStatus={emailIdError ? "error" : ""} help={emailIdError || ''} >
                            {
                                getFieldDecorator('emailId', {
                                    rules: [{ required: true, message: "Please enter your Email ID. " }, { type: "email", message: "Enter a valid Email ID" }],
                                })(
                                    <Input
                                        type="email"
                                        required
                                        name="email"
                                        className="form-control "
                                        placeholder=""
                                        setfieldsvalue="email"
                                        onChange={this.handleInput}
                                    />
                                )
                            }
                        </FormItem>
                        <p>Phone*</p>
                        <FormItem validateStatus={phoneNumberError ? "error" : ""} help={phoneNumberError || ''}>
                            {
                                getFieldDecorator('phoneNumber', {
                                    rules: [{ required: true, message: 'Please input your phone number!' }],
                                })(
                                    <Input
                                        type="number"
                                        required
                                        name="phone"
                                        className="form-control "
                                        placeholder=""
                                        setfieldsvalue="phone"
                                        onChange={this.handleInput} />
                                )
                            }
                        </FormItem>
                        <p>Message*</p>
                        <FormItem validateStatus={messageError ? "error" : ""} help={messageError || ''}>
                            {
                                getFieldDecorator('messageError', {
                                    rules: [{ required: true, message: 'Please enter your message' }],
                                })(
                                    <textarea
                                        required
                                        rows=""
                                        name="message"
                                        className=""
                                        placeholder=""
                                        setfieldsvalue="text"
                                        onChange={this.handleInput} />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Button>Submit</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        );
    }
}

ShippingDetails.propTypes = {
    form: PropTypes.object,
    actions: PropTypes.object,
    handleCancel: PropTypes.func,
};
