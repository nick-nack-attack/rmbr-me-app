import React, { Component } from 'react';
import LoginForm from "../../components/LoginForm/LoginForm";
import { Section } from "../../components/Utils/Utils";

export default class LoginPage extends Component {

    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    };

    handleLoginSuccess = () => {
        const { location, history } = this.props
        const destination = (location.state || {}.from || '/')
    };

    render() {
        return (
            <Section
                className='LoginPage'
            >
                <h2>Log In</h2>
                <LoginForm
                    onLoginSuccess={this.handleLoginSuccess}
                />
            </Section>
        )
    }
};