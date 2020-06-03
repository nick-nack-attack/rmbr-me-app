import React, { Component } from 'react';
import RmbrApiService from '../../services/rmbr-api-service';
import PersonListItem from "../../components/PersonListItem/PersonListItem";
import AddPersonForm from '../../components/AddPersonForm/AddPersonForm'
import { findRmbrByPersonId } from "../../helpers";
import RmbrmeContext from "../../contexts/RmbrmeContext";
import emptyStateForPersonList from '../../images/empty_people.png'

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

    onClickPerson = (person_id) => {
        this.props.history.push(`/person/${person_id}`)
    }

    renderPeople() {
        const { personArray = [] } = this.context
        const { rmbrArray = [] } = this.context

        if (personArray.length === 0) {
            return (
                <div>
                    <img src={emptyStateForPersonList}/>
                    <p>Add a Person to start!</p>
                </div>
            )
        }

        return personArray.map((person, index) =>
            <PersonListItem
                key={index}
                person={person}
                rmbrArray={findRmbrByPersonId(rmbrArray, person.id)}
                handleClickPerson={(person_id) => this.onClickPerson(person_id)}
            />
        )
    };

    render() {

        const { error } = this.context;
        const personCount = this.context.personArray.length;
        const rmbrCount = this.context.rmbrArray.length;
        const personLabel = personCount === 1 ? 'person' : 'people';
        const rmbrLabel = rmbrCount === 1? 'rmbr' : 'rmbrs';

        return (
            <>
                <ul id='person_list'>
                    <label
                        className='person_list_label'
                    >
                        You have <b>{ personCount }</b> { personLabel } with <b>{ rmbrCount }</b> { rmbrLabel }
                    </label>
                        { error
                            ? <p className='red'>There was an error, try again</p>
                            : this.renderPeople() }
                </ul>

                <div
                    className='add_person_div'
                >
                    <AddPersonForm/>
                </div>
            </>
        )
    }
}


