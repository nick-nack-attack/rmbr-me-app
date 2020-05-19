import React, { Component } from 'react';

const PeopleListContext = React.createContext(({
    userId: [],
    personId: [],
    peopleList: [],
    rmbrsList: [],
    error: null,
    setError: () => {},
    clearError: () => {},
    setPeopleList: () => {},
    setUserId: () => {},
    setPersonRmbrsList: () => {}
}))

export default PeopleListContext;

export class PeopleListProvider extends Component {
    state = {
        peopleList: [],
        rmbrsList: [],
        // notes: [],
        //list:[],
        //card: []
        error: null
    };

    setUserId = (userId) => {
        this.setState({ userId: localStorage.setItem('user_id', userId) });
        console.log('userid:', this.state.userId);
      };

    setPersonId = () => {
        this.setState({ personId: this.props.match.params.personId })
    }

    setPeopleList = peopleList => {
        this.setState({ peopleList })
    };

    setPersonRmbrsList = rmbrsList => {
        this.setState({ rmbrsList })
    };

    setError = error => {
        this.setState({ error })
    };

    clearError = () => {
        this.setState({error:null})
    };

    render() {
        const value = {
            userId: localStorage.getItem('user_id'),
            peopleList: this.state.peopleList,
            rmbrsList: this.state.rmbrsList,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setPeopleList: this.setPeopleList,
            setUserId: this.setUserId,
            setPersonId: this.setPersonId,
            setPersonRmbrsList: this.setPersonRmbrsList
        }
        return (
            <PeopleListContext.Provider value={value}>
                {this.props.children}
            </PeopleListContext.Provider>
        )
    }
};