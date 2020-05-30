import React, { Component } from 'react';
import UserLoggedOut from "../../components/UserLoggedOut/UserLoggedOut";
import PersonList from "../../components/PersonList/PersonList";

import './Root.css'

export default class Root extends Component {

    render() {

        return (
            <div className='root_container'>
                { !window.localStorage.getItem('rmbrme-client-auth-token') ? <UserLoggedOut/> : <PersonList/> }
            </div>
        )
    }
}


