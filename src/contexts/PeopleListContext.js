import React, { Component } from 'react';

const PeopleListContext = React.createContext(({
    peopleList: [],
    error: null,
    setError: () => {},
    clearError: () => {},
    setPeopleList: () => {}
}))

export default PeopleListContext;

export class PeopleListProvider extends Component {
    state = {
        peopleList: [],
        error: null
    };
    setPeopleList = peopleList => {
        this.setState({ peopleList })
    }
    setError = error => {
        this.setState({ error })
    }
    clearError = () => {
        this.setState({error:null})
    }
    render() {
        const value = {
            peopleList: this.state.peopleList,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setPeopleList: this.setPeopleList
        }
        return (
            <PeopleListContext.Provider value={value}>
                {this.props.children}
            </PeopleListContext.Provider>
        )
    }
};