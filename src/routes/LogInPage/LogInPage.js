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
        const { location, history } = this.props
        const userLoggedIn = window.localStorage.getItem('isLoggedIn')
        const destination = (location.state || {}).from || '/'
        history.push(destination)
        window.location.reload(true)

    }

    render() {
        console.log('login page is running...');
        return (
            <Section className='LoginPage'>
                <LogInForm
                    onLoginSuccess={this.handleLoginSuccess}
                />
            </Section>
        )
    }
}