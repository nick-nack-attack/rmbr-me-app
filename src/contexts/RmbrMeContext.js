import React, { Component } from "react";

export const nullPerson = {
    person_name: 'new person',
    category: 'Friend'
}

const RmbrMeContext = React.createContext({
    // vars
    userId: [],
    personId,
    person: nullPerson,
    peopleList: [],
    rmbrsList: [],
    error: null,
    // set
    setPerson: () => {},
    setPeopleList: () => {},
    setUserId: () => {},
    setPersonId: () => {},
    setRmbrsList: () => {},
    setError: () => {},
    //  clear
    clearPerson: () => {},
    clearError: () => {},
    // add
    addRmbr: () => {},
    addPerson: () => {},
    // delete
    deletePerson: () => {},
    deleteRmbr: () => {},
    // edit
    editPerson: () => {},
    editRmbr: () => {},
    toggle: false,
    toggleErrors: () => {},
    throwError: () => {},
    backButton: () => {}
});

export default RmbrMeContext;

export class RmbrMeProvider extends Component {
    state = {
        userId: [],
        personId: [],
        person: nullPerson,
        peopleList: [],
        rmbrsList: [],
        error: null
    };
    setPerson = person => {
        this.setState({person})
    };
    setPeopleList = peopleList => {
        this.setState({peopleList})
    };
    setUserId = (userId) => {
        this.setState({ userId: localStorage.setItem('user_id', userId) });
        console.log('userid:', this.state.userId);
    };
    setPersonId = () => {
        this.setState({ personId: this.props.match.params.personId })
    };
    setRmbrsList = rmbrsList => {
        this.setState({rmbrsList})
    };
    setError = error => {
        this.setState({error})
    };

    clearPerson = () => {
        this.setPerson(nullPerson)
        this.setRmbrs([])
    };
    clearError = () => {
        this.setState({error: null})
    };

    addRmbr = rmbr => {
        this.setRmbrs([
            ...this.state.rmbrsList,
            rmbr
        ])
    };
    addPerson = person => {
        this.setPeople([
            ...this.state.peopleList,
            person
        ])
    };

    render() {
        const value = {
            userId: localStorage.getItem('user_id'),
            personId: this.state.personId,
            person: this.state.person,
            peopleList: this.state.peopleList,
            rmbrsList: this.state.rmbrsList,
            error: this.state.error,
            setPerson: this.setPerson,
            setPeopleList: this.setPeopleList,
            setUserId: this.setUserId,
            setPersonId: this.setPersonId,
            setRmbrsList: this.setRmbrsList,
            setError: this.setError,
            clearPerson: this.clearPerson,
            clearError: this.clearError,
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