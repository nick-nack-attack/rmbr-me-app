import React, { Component } from 'react';

// component
import LogInForm from '../../Form/LogIn/LogInForm';

export default class LogInPage extends Component {

    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        }
    };

    handleLoginSuccess = () => {
        window.location.reload(true);
    };

    render() {
        return (
                <LogInForm
                    onLoginSuccess={(ev) => this.handleLoginSuccess(ev)}
                />
        );
    };
};