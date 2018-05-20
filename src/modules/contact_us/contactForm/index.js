import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Input, Button, Icon, message } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

import './index.scss';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default class ContactForm extends Component {
    constructor() {
        super();
        this.state = {
            contact_details: {
                name: '',
                email: '',
                phone: '',
                message: ''
            }
        };
    }

    componentDidMount() {
        this.props.form.validateFields();
    }

    componentWillReceiveProps(nxtProps) {
        if (nxtProps.contact_details.loaders !== this.props.contact_details.loaders) {
            if (nxtProps.contact_details.loaders.post_enquiry_loaded) {
                message.success("We have recieved your query and we will get back to you shortly! Till then grab a 4PM bar and get the hunger ka helathy solution!");
            } else if (nxtProps.contact_details.loaders.post_enquiry_load_err) {
                message.warn("Something had gone wrong. We were not able to record your query. Please try again!");
            }
        }
    }

    handleInput = (event) => {
        this.setState({
            contact_details: {
                ...this.state.contact_details,
                [event.target.name]: event.target.value
            }
        });
    };

    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err) => {
            if (!err) {
                this.props.actions.submitContactDetails(this.state.contact_details);
                this.props.form.resetFields();
                this.props.form.validateFields();
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldError, getFieldsError, isFieldTouched } = this.props.form;
        const { contact_details } = this.state;
        const nameError = isFieldTouched('name') && getFieldError('name');
        const phoneError = isFieldTouched('phone') && getFieldError('phone');
        const emailError = isFieldTouched('email') && getFieldError('email');
        const messageError = isFieldTouched('message') && getFieldError('');

        return (
            <Col xs={{ span: 22, offset: 1 }} md={{ span: 14, offset: 3 }} className="contactFormContainer">
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <FormItem label="Name" validateStatus={nameError ? "error" : ""} help={nameError || ''}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                type="text"
                                required
                                name="name"
                                className="form-control input"
                                placeholder=""
                                setfieldsvalue={contact_details.name}
                                onChange={this.handleInput}
                            />
                        )}
                    </FormItem>
                    <FormItem label="Email" validateStatus={emailError ? "error" : ""} help={emailError || ''} >
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: "Please enter your Email ID. " }, { type: "email", message: "Enter a valid Email ID" }],
                        })(
                            <Input
                                type="email"
                                required
                                name="email"
                                className="form-control input"
                                placeholder=""
                                setfieldsvalue={contact_details.email}
                                onChange={this.handleInput}
                            />
                        )}
                    </FormItem>
                    <FormItem label="Phone" validateStatus={phoneError ? "error" : ""} help={phoneError || ''}>
                        {getFieldDecorator('phone', {
                            rules: [
                                { required: true, message: 'Please input your phone number!' },
                                { len: 10, message: 'Please enter a valid number!' }
                            ],
                        })(
                            <Input
                                type="number"
                                required
                                addonBefore="+91"
                                name="phone"
                                className="form-control input"
                                placeholder=""
                                setfieldsvalue={contact_details.number}
                                onChange={this.handleInput}
                            />
                        )}
                    </FormItem>
                    <FormItem label="Message" validateStatus={messageError ? "error" : ""} help={messageError || ''}>
                        {getFieldDecorator('messageError', {
                            rules: [{ required: true, message: 'Please enter your message' }],
                        })(
                            <TextArea
                                autosize={{ minRows: 3, maxRows: 5 }}
                                required
                                name="message"
                                placeholder=""
                                setfieldsvalue={contact_details.message}
                                onChange={this.handleInput}
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button className="button flex-row flex-center" onClick={this.submit} disabled={(this.props.contact_details.loaders && this.props.contact_details.loaders.post_inquiry_loading) || hasErrors(getFieldsError())}>
                            {this.props.contact_details.loaders && this.props.contact_details.loaders.post_inquiry_loading &&
                                <Icon type="loading font-white" />
                            }
                            <span>SUBMIT ENQUIRY</span>
                        </Button>
                    </FormItem>
                </Form>
            </Col>
        );
    }
}

ContactForm.propTypes = {
    form: PropTypes.object,
    actions: PropTypes.object,
    handleCancel: PropTypes.func,
    contact_details: PropTypes.object,
    history: PropTypes.object
};
