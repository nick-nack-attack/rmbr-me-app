import React, { Component } from 'react'
import LogInForm from '../../components/LogInForm/LogInForm'
import { Section } from '../../components/Utils/Utils'

export default class LogInPage extends Component {

    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        }
    };

    handleLoginSuccess = () => {
        window.location.reload(true)

    }

    render() {
        return (
                <LogInForm
                    onLoginSuccess={(ev) => this.handleLoginSuccess(ev)}
                />
        )
    }
}