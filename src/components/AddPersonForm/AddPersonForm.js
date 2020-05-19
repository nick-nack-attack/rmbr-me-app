import React, { Component } from 'react';
import { Button, Textarea } from '../Utils/Utils';
import RmbrMeContext from "../../contexts/RmbrMeContext";
import {Link} from "react-router-dom";
import PeopleApiService from "../../services/person-api-service";

export default class AddPersonForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formPersonName: '',
            selectedOption: 'Friend',
            onPersonPostSuccess: () => {}
        }
    }

    static contextType = RmbrMeContext;

    goBack = () => {
        this.props.history.push('/my-people');
    };

    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value
        })
    }

    handleNameChange = changedName => {
        this.setState({
            formPersonName: changedName.target.value
        })
    }

    renderCategoryOptions() {
        return (
            <>
                <label><input 
                    type='radio' 
                    value='Friend'
                    checked={this.state.selectedOption === 'Friend'}
                    onChange={this.handleOptionChange}
                    ></input>Friend</label>
                    <label><input 
                    type='radio' 
                    value='Family'
                    checked={this.state.selectedOption === 'Family'}
                    onChange={this.handleOptionChange}
                    ></input>Family</label>
                    <label><input 
                    type='radio' 
                    value='Co-Worker'
                    checked={this.state.selectedOption === 'Co-Worker'}
                    onChange={this.handleOptionChange}
                    ></input>Co-Worker</label>
            </>
        )
    }

    handleSubmit = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const person_name = this.state.formPersonName
        const user_id = this.props.userId
        const type_of_person  = this.state.selectedOption
        const newPerson = { person_name, user_id, type_of_person }
        console.log('This is the new person: ', newPerson)
        PeopleApiService.postPerson(newPerson)
            .then(() => {
                this.context.addPerson(newPerson);
                person_name.value = '' // 
                type_of_person.value = '' // 
            })
            .catch(res => {
                console.log('shit!')
                this.setState({error: res.error})
            })
    }

    render() {
        return (
            <form onSubmit={(ev) => this.handleSubmit(ev)}>
                <legend>Add Person</legend>
                <div>
                    <label>Name</label>
                    <input 
                    name='personName' 
                    id='personName'
                    onChange={this.handleNameChange}
                    />
                </div>
                <div>
                    {this.renderCategoryOptions()}
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>


        )
    }
}