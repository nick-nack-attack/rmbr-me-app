import React, { Component } from 'react';
import {nullPerson} from "./RmbrContext";

export const blankPerson = {
    person_name: 'new person',
    category: 'Friend'
}

const PersonContext = React.createContext(({
    person_id: [],
    person: blankPerson,
    personArray: [],
    error: null,
    setError: () => {},
    clearError: () => {},
    setPersonArray: () => {},
    setPerson: () => {},
    addPerson: () => {},
    deletePerson: () => {},

    rmbrArray: [],
    setRmbrArray: () => {}
}))

export default PersonContext;

export class PersonProvider extends Component {
    state = {
        person_id: [],
        person: blankPerson,
        personArray: [],
        rmbrArray: [],
        error: null
    };

    setPersonId = person_id => {
        this.setState({ person_id: person_id })
    };

    setPerson = person => {
        this.setState({ person: person })
    };

    setPersonArray = personArray => {
        this.setState({ personArray })
    };

    setRmbrArray = rmbrArray => {
        this.setState({ rmbrArray })
    };

    setError = error => {
        this.setState({ error })
    };

    clearError = () => {
        this.setState({error:null})
    };

    addPerson = person => {
        this.setPersonArray([
            ...this.state.personArray,
            person
        ])
    };

    deletePerson = personId => {
        this.setState({
            personArray: this.state.personArray.filter(person => person.id !== personId)
        })
    };

    updatePerson = person => {
        this.setState({
            person: person
        })
    }

    clearPerson = () => {
        this.setPerson(nullPerson)
        this.setRmbrs([])
    };

    render() {
        const value = {
            personArray: this.state.personArray,
            person: this.state.person,
            error: this.state.error,
            setPerson: this.setPerson,
            setError: this.setError,
            clearError: this.clearError,
            setPersonArray: this.setPersonArray,
            setPersonId: this.setPersonId,
            addPerson: this.addPerson,
            deletePerson: this.deletePerson,
            updatePerson: this.updatePerson,

            rmbrArray: this.state.rmbrArray,
            setRmbrArray: this.setRmbrArray,
        }
        return (
            <PersonContext.Provider value={value}>
                {this.props.children}
            </PersonContext.Provider>
        )
    }
}

