import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PersonContext, { PersonProvider } from "../../contexts/PersonContext";
import RmbrApiService from '../../services/rmbr-api-service';
import { Section } from "../../components/Utils/Utils";
import PersonListItem from "../../components/PersonListItem/PersonListItem";
import AddPersonForm from '../../components/AddPersonForm/AddPersonForm'

import UserLoggedOut from "../../components/UserLoggedOut/UserLoggedOut";
import PersonList from "../../components/PersonList/PersonList";

import './Root.css'

export default class Root extends Component {

    render() {

        return (
            <div className='root_container'>
                { !window.localStorage.user_id ? <UserLoggedOut/> : <PersonList/> }
            </div>
        )
    }
}


