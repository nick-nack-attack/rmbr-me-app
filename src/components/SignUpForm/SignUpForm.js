import React, { Component } from 'react'
import { Input, Required } from '../Utils/Utils'
import AuthApiService from "../../services/auth-api-service";
import UserContext from "../../contexts/UserContext";

import Button from '@material-ui/core/Button';

export default class SignUpForm extends Component {

    static defaultProps = {
        onSignUpSuccess: () => {}
    };

    static contextType = UserContext;

    state = {
        error: null
    };

    handleSubmit = ev => {
        ev.preventDefault()
        const { user_name, password } = ev.target

        this.setState({ error: null })
        AuthApiService.postUser({
            user_name: user_name.value,
            password: password.value
        })
            .then(res => {
                user_name.value = ''
                password.value = ''
                this.context.setUserId(res.user_id, true);
                this.props.onSignUpSuccess()
            })
            .catch(r => {
                this.setState({ error: r.error })
            })
    }

    render() {
        const { error } = this.state;
        return (
            <form
                className='RegistrationForm'
                onSubmit={this.handleSubmit}
            >
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='user_name'>
                    <label htmlFor='RegistrationForm__user_name'>
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
                    Register
                </Button>
            </form>
        )
    }
}