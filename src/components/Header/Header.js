import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TokenService from '../../services/token-service'
import IdleService from "../../services/idle-service";
import Logo from '../../assets/rmbrme.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Header.css';

class Header extends Component {

    handleLogoutClick = () => {
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unregisterIdleResets();
        window.location.reload(true);
    };

    renderLogoutLink() {
        return (
            <div
                className='Header__logged-in'
            >
                <Link
                    onClick={this.handleLogoutClick}
                    to='/'
                >
                    Logout <FontAwesomeIcon icon='sign-out-alt' />
                </Link>
            </div>
        );
    };

    renderLoginLink() {
        return (
            <div className='Header__not-logged-in'>
                <Link
                    id='log-in-link'
                    to='/log-in'>
                    Log in
                </Link>
                <Link
                    id='sign-up-link'
                    to='/sign-up'>
                    Sign Up
                </Link>
            </div>
        );
    };

    render() {
        return (
            <>
                <nav
                    className='Header'
                >
                    <h1>
                            <img
                                id='rmbrme_logo'
                                src={Logo}
                                alt='rmbrme'
                                onClick={() => this.props.history.push('/')}
                            />
                    </h1>
                    <span
                        className='Header__tagline--wide'
                    >
                        Be a Better Buddy
                    </span>
                        { TokenService.hasAuthToken()
                            ? this.renderLogoutLink()
                            : this.renderLoginLink() }
                    </nav>
                    <span className='Header__tagline--narrow'> </span>
            </>
        )
    }
}

export default withRouter(Header);