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
        const destination = (location.state || {}).from || '/'
        history.push(destination)
        window.location.reload(true)

    }

    render() {
        return (
            <Section className='LoginPage'>
                <LogInForm
                    onLoginSuccess={(e) => this.handleLoginSuccess(e)}
                />
            </Section>
        )
    }
}