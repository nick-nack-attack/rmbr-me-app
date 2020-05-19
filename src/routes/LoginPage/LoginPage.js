import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { Section } from '../../components/Utils/Utils'

export default class LoginPage extends Component {

    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        }
    };

    handleLoginSuccess = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/my-people'
        history.push(destination)
    }

    render() {
        console.log('login page is running...');
        return (
            <Section className='LoginPage'>
                <h2>Login</h2>
                <LoginForm
                    onLoginSuccess={this. handleLoginSuccess}
                />
            </Section>
        )
    }
}