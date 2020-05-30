import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'
import { Button, Input } from '../Utils/Utils'
import RmbrmeContext from "../../contexts/RmbrmeContext";
import TokenService from '../../services/token-service'

export default class LogInForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            user_name: '',
            password: ''
        }
    };

    static defaultProps = {
        onLoginSuccess: () => {},
    };

    static contextType = RmbrmeContext;

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const user_name = this.state.user_name;
        const password = this.state.password
        const UserLogin = { user_name, password }

        AuthApiService.postLogin(UserLogin)
            .then(res => {
                user_name.value = ''
                password.value = ''
                this.context.setUserId(res.user_id);
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
                <div className='user_name'>
                    <label htmlFor='LoginForm__user_name'>
                        User name
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
                    {error && <p className='error_message'>{error}</p>}
                </div>
            </form>
        )
    }
}