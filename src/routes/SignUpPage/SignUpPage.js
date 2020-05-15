import React, { Component } from 'react';
import { Section } from "../../components/Utils/Utils";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

export default class SignUpPage extends Component {

    static defaultProps = {
        history: {
            push: () => {},
        },
    };

    handleSignUpSuccess = () => {
        console.log('handleSignUpSuccess on SignUp page ran')
        const { history } = this.props
        history.push('/login')
    };

    render() {

        return (
            <Section
                className='SignUpPage'
            >
                <h2>Sign Up</h2>
                <SignUpForm
                    onRegistrationSuccess={this.handleSignUpSuccess}
                />
            </Section>
        )
    }
};