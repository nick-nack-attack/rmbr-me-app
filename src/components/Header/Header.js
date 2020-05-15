import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import './Header.css'

export default class Header extends Component {

    handleLogoutClick = () => {
        this.handleLogoutClick = () => {
            TokenService.clearAuthToken()
            TokenService.clearCallbackBeforeExpiry()
            IdleService.unregisterIdleResets()
        }
    };

    renderLogoutLink() {
        return (
            <div className={'Header__logged-in'}>
                <Link
                    onClick={this.handleLogoutClick}
                    to={'/'}>
                        Logout
                </Link>
            </div>
        )
    };

    renderLoginLink() {
        return (
            <div className={'Header__logged-in'}>
                <Link
                    to={'/login'}>
                    Log In
                </Link>
                <Link
                    to={'/signup'}
                >
                    Sign Up
                </Link>
            </div>
        )
    };

    render() {
        return (
            <>
                <nav
                    className='Header'
                >
                        <h1>
                            <Link to={'/'}>
                                rmbr me
                            </Link>
                        </h1>
                <span
                    className='Header__tagline-wide'
                >
                    Remember the details of friends
                </span>
                    {TokenService.hasAuthToken()
                        ? this.renderLogoutLink()
                        : this.renderLoginLink()
                    };
                </nav>
                <span
                    className='Header__tagline--narrow'
                >
                    Remember the details of friends
                </span>
            </>
        )
    }
};