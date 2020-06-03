import React, { Component } from 'react'
import SignUpForm from "../../components/SignUpForm/SignUpForm";

export default class SignUpPage extends Component {

    static defaultProps = {
        history: {
            push: () => {},
        },
    }

    handleSignUpSuccess = user => {
        const { history } = this.props
        history.push('/')
    }

    render() {
        return (
                <SignUpForm
                    onSignUpSuccess={this.handleSignUpSuccess}
                />
        )
    }
}