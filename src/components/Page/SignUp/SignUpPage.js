// component for user to create an account
import React, { Component } from 'react';

// component
import SignUpForm from "../../Form/SignUp/SignUpForm";

export default class SignUpPage extends Component {

    static defaultProps = {
        history: {
            push: () => {},
        },
    }

    handleSignUpSuccess = () => {
        window.location.reload(true);
    }

    render() {
        return (
                <SignUpForm
                    onSignUpSuccess={this.handleSignUpSuccess}
                />
        )
    }
}