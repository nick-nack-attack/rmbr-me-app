import React, { Component } from "react";

export const nullPerson = {
    person_name: 'new person',
    category: 'Friend'
}

const RmbrContext = React.createContext({
    rmbr: {},
    rmbrList: [],
    error: null,
    setRmbrList: () => {},
    setError: () => {},
    addRmbr: () => {},
    deleteRmbr: () => {},
    editRmbr: () => {},
    toggleErrors: () => {},
    throwError: () => {},
    updateRmbr: () => {}
});

export default RmbrContext;

export class RmbrProvider extends Component {
    state = {
        rmbr: {},
        rmbrList: [],
        error: null,
    };

    setRmbr = rmbr => {
        this.setState({rmbr})
    }

    setRmbrList = rmbrList => {
        this.setState({rmbrList: rmbrList})
    };

    updateRmbr = updatedRmbr => {
        const newArray = [];
        const oldList = newArray.push(this.state.rmbrList.filter((rmbr) => rmbr.id !== updatedRmbr.id))
        this.setRmbrList([
            ...this.state.rmbrList,
            updatedRmbr
        ])
        this.setState({
            rmbrList: this.state.rmbrList
        })
        console.log('THE THE THE THE UPDATE RAAAAAAN!')
        };


    setError = error => {
        this.setState({error})
    };

    clearError = () => {
        this.setState({error: null})
    };

    deleteRmbr = rmbrId => {
        this.setState({
            rmbrList: this.state.rmbrList.filter((rmbr) => rmbr.id !== rmbrId)
        })
    };

    addRmbr = rmbr => {
        this.setRmbrList([
            ...this.state.rmbrList,
            rmbr
        ])
    };

    render() {
        const value = {
            user_id: localStorage.getItem('user_id'),
            person_id: this.state.person_id,
            person: this.state.person,
            peopleList: this.state.peopleList,
            rmbrList: this.state.rmbrList,
            error: this.state.error,
            setRmbr: this.setRmbr,
            setRmbrList: this.setRmbrList,
            addRmbr: this.addRmbr,
            setError: this.setError,
            clearError: this.clearError,
            deleteRmbr: this.deleteRmbr,
            updateRmbr: this.updateRmbr
        }
        return (
            <RmbrContext.Provider value={value}>
                {this.props.children}
            </RmbrContext.Provider>
        )
    }
}