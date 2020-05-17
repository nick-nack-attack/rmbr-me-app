import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PeopleListContext from "../../contexts/PeopleListContext";
import PeopleApiService from '../../services/person-api-service';
import { Section } from "../../components/Utils/Utils";
import PersonListItem from "../../components/PersonListItem/PersonListItem";
import CircleButton from "../../components/CircleButton/CircleButton";

import './MyPeople.css'

export default class MyPeople extends Component {

    static contextType = PeopleListContext;

    componentDidMount() {
        console.log('componentDidMount ran')
        this.context.clearError()
        PeopleApiService.getPeople()
            .then(this.context.setPeopleList)
            .catch(this.context.setError)
    };

    renderPeople() {
        const { peopleList = [] } = this.context
        return peopleList.map(person =>
            <PersonListItem
                key={person.id}
                id={person.id}
                person_name={person.person_name}
                type_of_person={person.type_of_person}
            />
        )
    };

    render() {

        const { error } = this.context;

        return (
            <>
                <ul className='people_list'>
                    {error
                        ? <p className='red'>There was an error, try again</p>
                        : this.renderPeople()}
                </ul>

                <div className='PeopleListPage__add-person-button'>
                    <Link to={'/add-person'}>
                    <CircleButton>
                        Add Person
                    </CircleButton>
                    </Link>
                </div>
            </>
        )
    }
}


