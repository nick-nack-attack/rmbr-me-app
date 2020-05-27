import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Textarea, Input } from '../Utils/Utils';
import { Link } from "react-router-dom";
import RmbrApiService from "../../services/rmbr-api-service";
import PersonContext from "../../contexts/PersonContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './AddPersonForm.css'

export default class AddPersonForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formPersonName: '',
            selectedOption: 'Friend'
        }
    }

    static contextType = PersonContext;

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
    />Friend</label>
                    <label><input
    type='radio'
    value='Family'
    className='middle_imput_button'
    checked={this.state.selectedOption === 'Family'}
    onChange={this.handleOptionChange}
    />Family</label>
                    <label><input
    type='radio'
    value='Co-Worker'
    checked={this.state.selectedOption === 'Co-Worker'}
    onChange={this.handleOptionChange}
    />Co-Worker</label>
            </>
        )
    }

    handleSubmit = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const person_name = this.state.formPersonName
        const user_id = RmbrApiService.getUserId()
        const type_of_person  = this.state.selectedOption
        const newPerson = { person_name, user_id, type_of_person }
        RmbrApiService.postPerson(newPerson)
            .then(res => {
                this.context.addPerson(res)
            })
            .catch(res => {
                this.setState({error: res.error})
            })
    }

    render() {
        return (
            <form onSubmit={(ev) => this.handleSubmit(ev)}>
                <legend>Add Person</legend>
                <div>
                    <Input
                        name='personName'
                        id='personName'
                        placeholder='Type Person Here'
                        onChange={this.handleNameChange}
                    />
                </div>
                <div className='add_person_radio_options'>
                    {this.renderCategoryOptions()}
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>


        )
    }
}