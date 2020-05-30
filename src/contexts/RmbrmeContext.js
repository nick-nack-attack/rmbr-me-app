import React, { Component } from 'react';

export const nullPerson = {
    person_name: '',
    category: ''
};

const RmbrmeContext = React.createContext({
    // user
    user_id: {},
    setUserId: () => {},
    setUserLoggedOut: () => {},
        // person
        selected_person: nullPerson,
        personArray: [],
        setSelectedPerson: () => {},
        setPersonArray: () => {},
        addPerson: () => {},
        deletePerson: () => {},
        editPerson: () => {},
            // rmbr
            selected_rmbr: {},
            rmbrArray: [],
            setSelectedRmbr: () => {},
            setRmbrArray: () => {},
            addRmbr: () => {},
            deleteRmbr: () => {},
            updateRmbrArray: () => {},
    // errors
    error: null,
    setError: () => {},
    clearError: () => {},
});

export default RmbrmeContext;

export class RmbrmeProvider extends Component {
    state = {
        user: {},
        selected_person: nullPerson,
        personArray: [],
        selected_rmbr: {},
        rmbrArray: [],
        error: null
    };

    setUserId = (user_id) => {
        this.setState({
            user_id: localStorage.setItem('user_id', user_id)
        })
    };

    setSelectedPerson = (person) => {
        this.setState({selected_person: person})
    };

    setPersonArray = (personArray) => {
        this.setState({personArray})
    };

    addPerson = (person) => {
        this.setPersonArray([
            ...this.state.personArray,
        person
                            ])
    };

    deletePerson = (person_id) => {
        this.setState({
        personArray: this.state.personArray.filter(person => person.id !== person_id
            )
        })
    };

    editPerson = (person) => {
        this.setState({
            person
        })
    };

    setSelectedRmbr = (rmbr) => {
    this.setState({rmbr})
    };

    setRmbrArray = (rmbrArray) => {
        this.setState({rmbrArray})
    };

    addRmbr = (rmbr) => {
        this.setState({rmbr})
    };

    deleteRmbr = (rmbr_id) => {
        this.setState({
            rmbrArray: this.state.rmbrArray.filter((rmbr) => rmbr.id !== rmbr_id)
        })
    };

    updateRmbrArray = (editedRmbr) => {
        const oldArray = this.state.rmbrArray
        const newArray = oldArray.filter(rmbr => rmbr.id !== editedRmbr.id)
        this.setRmbrArray(newArray)
        this.setRmbrArray([
            ...this.state.rmbrArray,
            editedRmbr
        ])
    };

    setError = error => {
        this.setState({error})
    };

    clearError = () => {
        this.setState({error: null})
    };

    render() {

        const value = {
            // user
            user_id: this.state.user_id,
            setUserId: this.setUserId,
            setUserLoggedOut: this.setUserLoggedOut,
            // person
            selected_person: this.state.selected_person,
            personArray: this.state.personArray,
            setSelectedPerson: this.setSelectedPerson,
            setPersonArray: this.setPersonArray,
            addPerson: this.addPerson,
            deletePerson: this.deletePerson,
            editPerson: this.editPerson,
            // rmbr
            selected_rmbr: this.state.selected_rmbr,
            rmbrArray: this.state.rmbrArray,
            setSelectedRmbr: this.setSelectedRmbr,
            setRmbrArray: this.setRmbrArray,
            addRmbr: this.addRmbr,
            deleteRmbr: this.deleteRmbr,
            updateRmbrArray: this.updateRmbrArray,
            // errors
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError

        }

        return (
            <RmbrmeContext.Provider value={ value }>
                { this.props.children }
            </RmbrmeContext.Provider>
        );
    }
}

