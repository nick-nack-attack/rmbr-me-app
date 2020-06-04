import React, { Component } from 'react'
import AuthApiService from "../../services/auth-api-service";
import RmbrmeContext from "../../contexts/RmbrmeContext";
import { Button, Input, Required } from '../Utils/Utils';
import ErrorMsg from "../Utils/ErrorMsg";


export default class SignUpForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            user_name: '',
            password: ''
        };
    };

    static defaultProps = {
        onSignUpSuccess: () => {}
    };

    static contextType = RmbrmeContext;

    handleSubmit = ev => {
        ev.preventDefault();
        this.setState({
            error: null
        });
        const user_name = this.state.user_name;
        const password = this.state.password;
        const UserLogin = { user_name, password };

        AuthApiService.postUser(UserLogin)
            .then(user => {
                this.context.setUserId(user.id);
                this.setState({
                    user_name: '',
                    password: ''
                });
                AuthApiService.postLogin(UserLogin)
                    .then(() => {
                        this.props.onSignUpSuccess()
                    });
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.getAttribute("name");
        this.setState({
            [name]: value
        });
    };

    render() {
        const { error } = this.state;
        return (
            <form
                className='SignUpForm'
                onSubmit={this.handleSubmit}
            >
                <legend>
                    <h2>
                        Sign Up
                    </h2>
                </legend>
                <div
                    className='user_name'
                >
                    <label
                        htmlFor='RegistrationForm__user_name'
                    >
                        Email <Required />
                    </label>
                    <Input
                        name='user_name'
                        type='email'
                        required
                        id='RegistrationForm__user_name'
                        onChange={(e) => this.handleInputChange(e)}
                    >
                    </Input>
                </div>
                <div
                    className='password'
                >
                    <label
                        htmlFor='RegistrationForm__password'
                    >
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
                <Button
                    type='submit'
                >
                    Get started!
                </Button>
                <div
                    role='alert'
                >
                    { error && <ErrorMsg message={error.message || error}/> }
                </div>
            </form>
        );
    };
};