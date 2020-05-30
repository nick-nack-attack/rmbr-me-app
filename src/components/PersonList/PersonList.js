import React, { Component } from 'react';
import RmbrApiService from '../../services/rmbr-api-service';
import PersonListItem from "../../components/PersonListItem/PersonListItem";
import AddPersonForm from '../../components/AddPersonForm/AddPersonForm'
import { findRmbrByPersonId } from "../../helpers";
import RmbrmeContext from "../../contexts/RmbrmeContext";

export default class PersonList extends Component {

    static contextType = RmbrmeContext;

    componentDidMount() {
        this.context.clearError()
        const user_id = window.localStorage.getItem('user_id')
        RmbrApiService.getPersonByUserId(user_id)
            .then(this.context.setPersonArray)
            .catch(this.context.setError)
        RmbrApiService.getRmbrByUserId(user_id)
            .then(res => this.context.setRmbrArray(res))
            .catch(this.context.setError)
    };

    renderPeople() {
        const { personArray = [] } = this.context
        const { rmbrArray = [] } = this.context
        return personArray.map((person, index) =>
            <PersonListItem
                key={index}
                person={person}
                rmbrArray={findRmbrByPersonId(rmbrArray, person.id)}
            />
        )
    };

    render() {

        const { error } = this.context;

        return (
            <>
                <ul id='person_list'>
                    <label>You have <b>{this.context.personArray.length}</b> people with <b>{this.context.rmbrArray.length}</b> rmbrs</label>
                    { error
                        ? <p className='red'>There was an error, try again</p>
                        : this.renderPeople() }
                </ul>

                <div className='PeopleListPage__add-person-button'>
                    <AddPersonForm/>
                </div>
            </>
        )
    }
}

