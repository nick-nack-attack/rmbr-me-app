import React, { Component, useState, useContext } from 'react';
import AuthApiService from '../../../services/auth-api-service';
import RmbrmeContext from "../../../contexts/RmbrmeContext";
import { Button, Input } from '../../Utils/Utils';

import "../Form.scss";
import Loader from '../../Utils/Loader';

const LogIn = props => {

    const [ email, setemail ] = useState();
    const [ password, setPassword ] = useState();
    const [ buttonLabel, setButtonLabel ] = useState('Welcome back!');
    const [ error, seterror ] = useState(null);

    let context = useContext(RmbrmeContext);

    let handleSubmitJwtAuth = ev => {
        setButtonLabel('Submitting Login...');
        ev.preventDefault();
        seterror(null);
        let userLogin = {
            user_name: email,
            password: password
        };
        AuthApiService.postLogin(userLogin)
            .then(() => {
                setPassword('');
                setemail('');
                props.onLoginSuccess();
            })
            .catch(res => {
                setButtonLabel('Somthing went wrong');
                seterror(res.error);
            })
    };

    let handleDemoLogin = ev => {
        setButtonLabel('Submitting Login...');
        ev.preventDefault();
        seterror(null);

        let userLogin = {
            user_name: 'JoeBang@gmail.com',
            password: '$uperS1pper'
        };

        AuthApiService.postLogin(userLogin)
            .then(() => {
                this.setState({
                    user_name: '',
                    password: ''
                })
                props.onLoginSuccess();
            })
            .catch(res => {
                setButtonLabel('Somthing went wrong');
                seterror(res.error);
            })
    };

    return (
        <>
            <form
                className='LoginForm'
                onSubmit={e => handleSubmitJwtAuth(e)}
            >
                <legend>
                    <h2>
                        Log in {}
                    </h2>
                </legend>
                <div
                    className='user_name'
                >
                    <label
                        htmlFor='LoginForm__user_name'
                    >
                        Email
                    </label>
                    <Input
                        required
                        name='user_name'
                        type='email'
                        id='LoginForm__user_name'
                        value={email}
                        onChange={e => setemail(e.target.value)}
                    >
                    </Input>
                </div>
                <div
                    className='password'
                >
                    <label
                        htmlFor='LoginForm__password'
                    >
                        Password
                    </label>
                    <Input
                        required
                        name='password'
                        type='password'
                        id='LoginForm__password'
                        onChange={e => setPassword(e.target.value)}
                    >
                    </Input>
                </div>
                <Button
                    label="Login"
                    type="submit"
                />
                <div
                    role='alert'
                >
                    { 
                        error 
                            ? <p className='error_message'>{error.message || error}</p> 
                            : <p className="info_message">{ buttonLabel }</p>}
                </div>
            </form>
            <Button
                label="Login with Demo Account"
                className='login_with_demo_account_button'
                onClick={e => handleDemoLogin(e)}
            />
        </>
    )

}

export default LogIn;