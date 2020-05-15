import React, { Component } from "react";

export const nullPerson = {
    person_name: 'new person',
    category: 'Friend'
}

const RmbrMeContext = React.createContext({
    person: nullPerson,
    rmbrs: [],
    error: null,
    setError: () => {},
    clearError: () => {},
    setPerson: () => {},
    clearPerson: () => {},
    setRmbrs: () => {},
    addRmbr: () => {},
    addPerson: () => {},
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
            addRmbr: this.addRmbr
        }
        return (
            <RmbrMeContext.Provider value={value}>
                {this.props.children}
            </RmbrMeContext.Provider>
        )
    }
}