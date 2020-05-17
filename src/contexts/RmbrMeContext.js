import React, { Component } from "react";

export const nullPerson = {
    person_name: 'new person',
    category: 'Friend'
}

const RmbrMeContext = React.createContext({
    person: nullPerson,
    rmbrs: [],
    people: [],
    error: null,
    setError: () => {},
    clearError: () => {},
    setPerson: () => {},
    clearPerson: () => {},
    setRmbrs: () => {},
    addRmbr: () => {},
    addPerson: () => {},
    setPeople: () => {},
    deletePerson: () => {},
    editPerson: () => {},
    deleteRmbr: () => {},
    editRmbr: () => {},
    toggle: false,
    toggleErrors: () => {},
    throwError: () => {},
    backButton: () => {}
});

export default RmbrMeContext;

export class PersonProvider extends Component {
    state = {
        person: nullPerson,
        error: null
    };
    setError = error => {
        this.setState({error})
    };
    clearError = () => {
        this.setState({error: null})
    };
    setPerson = person => {
        this.setState({person})
    };
    setPeople = people => {
        this.setState({people})

    }
    setRmbrs = rmbrs => {
        this.setState({rmbrs})
    };
    clearPerson = () => {
        this.setPerson(nullPerson)
        this.setRmbrs([])
    };
    addRmbr = rmbr => {
        this.setRmbrs([
            ...this.state.rmbrs,
            rmbr
        ])
    };
    addPerson = person => {
        this.setPeople([
            ...this.state.people,
            person
        ])
    }
    render() {
        const value = {
            person: this.state.person,
            rmbrs: this.state.rmbrs,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setPerson: this.setPerson,
            setRmbrs: this.setRmbrs,
            clearPerson: this.clearPerson,
            addRmbr: this.addRmbr,
            addPerson: this.addPerson
        }
        return (
            <RmbrMeContext.Provider value={value}>
                {this.props.children}
            </RmbrMeContext.Provider>
        )
    }
}