// Sign Up Page
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input, Required } from "../Utils/Utils";

// Services
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";

// Contexts
import { UserContext } from "../../contexts/UserContext";
import { useInputChange } from "../../hooks/useInputChange";

// Elements
import ErrorMsg from "../Utils/ErrorMsg";

const SignUp = () => {

    const history = useHistory();

    const [ input, handleInputChange ] = useInputChange();
    const [ errors, setErrors ] = useState({});

    let { dispatch } = useContext(UserContext);

    let login = (settings) => dispatch({
        type: 'login',
        data: settings
    });

    const validateSignupForm = e => {
        e.preventDefault();
        let errors = {};
        if (['user_name'] === undefined || input['user_name'] === '') {
            errors.user_name = { message: 'Email is required'}
        };
        if (['password'] === undefined || input['password'] === '') {
            errors.password = { message: "Password is required" }
        };
        const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/;
        if( !REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(input["password"]) ) {
            errors.password = { message: `Requires at least one special character, one uppercase letter, and one number` }
        };
        if( input["password"] !== undefined && input["password"].length < 8 ) {
            errors.password = { message: `Password must be at least 8 characters` }
        };
        if( input["password"] !== input["password-repeat-field"] ) {
            errors["password-repeat-field"] = { message: `Passwords must match` }
        };
        if( input.nickname === undefined || input.nickname === '' ) {
            errors.displayName = { message: 'Display name is required' }
        };
        if ( Object.keys(errors).length !== 0 ) {
            return (
                setErrors(errors)
            )
        } else {
            submitForm();
        }
    };

    // submit if validation passes
    const submitForm = () => {
        const registrationCreds = {
            user_name: input['user_name'],
            password: input['password']
        };
        AuthApiService
            .postUser(registrationCreds)
            .then(r => {
                AuthApiService
                    .postLogin({
                        user_name: registrationCreds.user_name,
                        password: registrationCreds.password
                    })
                    .then(r => {
                        TokenService.saveAuthToken(r.authToken);
                    })
                    .then(r => {
                        history.push('/')
                        login(r);
                    });
            })
            .catch(r => {
                if (r.error === 'Username already taken') {
                    setErrors( { user_name: { message: r.error } } );
                }
            });
    };

    return (
        <div className="Main">
            <form
                id="Signup_form"
                className="Signup_form base-form"
                onSubmit={(e) => validateSignupForm(e) }
            >
                <h2 className="Main-heading">Sign Up</h2>
                <label htmlFor="email-field">
                    Email
                    { errors.user_name
                        ? <ErrorMsg
                            message={errors.user_name.message}
                        />
                        : ""
                    }
                </label>
                <input
                    type="email"
                    id="email-field"
                    name="user_name"
                    autoComplete="email"
                    onChange={handleInputChange}
                />
                <label htmlFor="password-field">
                    Password
                    { errors.password
                        ? <ErrorMsg
                            message={errors.password.message}
                        />
                        : ""
                    }
                </label>
                <input
                    type="password"
                    id="password-field"
                    name="password"
                    autoComplete="current-password"
                    onChange={handleInputChange}
                />
                <label htmlFor="password-repeat-field">
                    Repeat Password
                    { errors["password-repeat-field"]
                        ? <ErrorMsg
                            message={errors["password-repeat-field"].message}
                        />
                        : ""
                    }
                </label>
                <input
                    type="password"
                    id="password-repeat-field"
                    name="password-repeat-field"
                    autoComplete="current-password"
                    onChange={handleInputChange}
                />
                <Button
                    id="submit-signup-btn"
                    className="submit-btn"
                    type="submit"
                    name="submit-btn"
                    form="Signup_form"
                    text="Sign Up"
                />
                <Button
                    id="cancel-btn"
                    className="cancel-btn"
                    type="button"
                    name="cancel-btn"
                    text="Cancel"
                    onClick={(e) => {
                        history.push('/')
                    }}
                />
            </form>
        </div>
    )
};

export default SignUp;