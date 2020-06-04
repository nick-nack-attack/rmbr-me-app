import React, { Component } from 'react'
import SignUpForm from "../../components/SignUpForm/SignUpForm";

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