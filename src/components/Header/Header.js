import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Hyph } from "../Utils/Utils";
import TokenService from '../../services/token-service'
import IdleService from "../../services/idle-service";
import './Header.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Header extends Component {

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        TokenService.clearCallbackBeforeExpiry()
        IdleService.unregisterIdleResets()
        window.location.reload(true)
    };

    renderLogoutLink() {
        return (
            <div className='Header__logged-in'>
                <Link
                    onClick={this.handleLogoutClick}
                    to='/'
                >
                    Logout <FontAwesomeIcon icon='sign-out-alt' />
                </Link>
            </div>
        )
    };

    renderLoginLink() {
        return (
            <div className='Header__not-logged-in'>
                <Link
                    to='/log-in'>
                    Log in
                </Link>
                <Link
                    to='/sign-up'>
                    Free Sign Up
                </Link>
            </div>
        )
    };

    render() {
        return (
            <>
                <nav className='Header'>
                    <h1>
                        <Link to='/'>
                            {' '}
                            rmbrme
                        </Link>
                    </h1>
                    <span className='Header__tagline--wide'>Be a Better Buddy</span>
                        { TokenService.hasAuthToken()
                            ? this.renderLogoutLink()
                            : this.renderLoginLink() }
                    </nav>
                    <span className='Header__tagline--narrow'> </span>
            </>
        )
    }
}

export default withRouter(Header)