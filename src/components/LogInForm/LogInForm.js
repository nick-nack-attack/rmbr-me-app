import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'
import { Button, Input } from '../Utils/Utils'
import RmbrmeContext from "../../contexts/RmbrmeContext";

export default class LogInForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            user_name: '',
            password: '',
            onLoginSuccess: () => {}
        }
    };

    static contextType = RmbrmeContext;

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const user_name = this.state.user_name;
        const password = this.state.password
        const UserLogin = { user_name, password }

        AuthApiService.postLogin(UserLogin)
            .then(() => {
                this.state.user_name = ''
                this.state.password = ''
                this.props.onLoginSuccess()
            })
            .catch(res => {
                this.setState({
                    error: res.error
                })
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
        const {error} = this.state;
        return (
            <form
                className='LoginForm'
                onSubmit={this.handleSubmitJwtAuth}
            >
                <legend><h2>Log in</h2></legend>
                <div className='user_name'>
                    <label htmlFor='LoginForm__user_name'>
                        Email
                    </label>
                    <Input
                        required
                        name='user_name'
                        id='LoginForm__user_name'
                        onChange={(e) => this.handleInputChange(e)}
                    >
                    </Input>
                </div>
                <div className='password'>
                    <label htmlFor='LoginForm__password'>
                        Password
                    </label>
                    <Input
                        required
                        name='password'
                        type='password'
                        id='LoginForm__password'
                        onChange={(e) => this.handleInputChange(e)}
                    >
                    </Input>
                </div>
                <Button type='submit'>
                    Login
                </Button>
                <div role='alert'>
                    { error && <p className='error_message'>{error.message || error}</p> }
                </div>
            </form>
        )
    }
}