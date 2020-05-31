import React, { Component } from 'react'
import AuthApiService from "../../services/auth-api-service";
import { Button, Section, Input, Required } from '../Utils/Utils'
import RmbrmeContext from "../../contexts/RmbrmeContext";

export default class SignUpForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            user_name: '',
            password: ''
        }
    };

    static defaultProps = {
        onSignUpSuccess: () => {}
    };

    static contextType = RmbrmeContext;

    handleSubmit = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const user_name = this.state.user_name;
        const password = this.state.password
        const UserLogin = { user_name, password }
        AuthApiService.postUser(UserLogin)
            .then(user => {
                this.context.setUserId(user.id);
                this.setState({
                    user_name: '',
                    password: ''
                })
                AuthApiService.postLogin(UserLogin)
                    .then(res => {
                        this.props.onLoginSuccess()
                    })
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.getAttribute("name");
        this.setState({
            [name]: value
        });
    }

    render() {
        const { error } = this.state;
        return (
            <Section>
                <h2>Sign Up</h2>
                <p>I spent like 20 hours figuring out how to make this all secure and slick-like. No Email Verification Required. Lose your login. Your data is lost forever!</p>
            <form
                className='SignUpForm'
                onSubmit={this.handleSubmit}
            >
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
                        id='RegistrationForm__user_name'
                        onChange={(e) => this.handleInputChange(e)}
                    >
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
                        id='RegistrationForm__password'
                        onChange={(e) => this.handleInputChange(e)}
                    >
                    </Input>
                </div>
                <Button type='submit'>
                    Get started!
                </Button>
                <div role='alert'>
                    { error && <p className='error_message'>{error.message || error}</p> }
                </div>
            </form>
            </Section>
        )
    }
}