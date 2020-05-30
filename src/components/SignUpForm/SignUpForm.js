import React, { Component } from 'react'
import AuthApiService from "../../services/auth-api-service";
import { Button, Section, Input, Required } from '../Utils/Utils'
import RmbrmeContext from "../../contexts/RmbrmeContext";

export default class SignUpForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null
        }
    };

    static defaultProps = {
        onSignUpSuccess: () => {}
    };

    static contextType = RmbrmeContext;

    handleSubmit = ev => {
        ev.preventDefault()
        const { user_name, password } = ev.target
        this.setState({ error: null })
        AuthApiService.postUser({
            user_name: user_name.value,
            password: password.value
        })
            .then(user => {
                user_name.value = ''
                password.value = ''
                this.context.setUserId(user.user_id);
                this.props.onSignUpSuccess()
            })
            .catch(res => {
                this.context.setError({ error: res.error })
            })
    }

    render() {
        const { error } = this.state;
        return (
            <Section>
            <form
                className='SignUpForm'
                onSubmit={this.handleSubmit}
            >
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='user_name'>
                    <label
                        htmlFor='RegistrationForm__user_name'
                    >
                        User name <Required />
                    </label>
                    <Input
                        name='user_name'
                        type='text'
                        required
                        id='RegistrationForm__user_name'>
                    </Input>
                </div>
                <div className='password'>
                    <label htmlFor='RegistrationForm__password'>
                        Password <Required />
                    </label>
                    <Input
                        name='password'
                        type='password'
                        required
                        id='RegistrationForm__password'>
                    </Input>
                </div>
                <Button type='submit'>
                    Get started!
                </Button>
            </form>
            </Section>
        )
    }
}