import React, { Component } from 'react';
import RmbrApiService from "../../services/rmbr-api-service";
import PersonContext from "../../contexts/PersonContext";
import {Input} from "../Utils/Utils";

export default class EditPersonForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formPersonName: this.props.person_name,
            selectedOption: this.props.type_of_person,
            error: null,
            onCancelEdit: () => {},
            onEditPersonSuccess: () => {},
            onHideEditForm: () => {}
        }
    }

    static contextType = PersonContext;

    handleHideForm = e => {
        this.props.onHideEditForm()
    }

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

    handleEditPersonSubmit = e => {
        e.preventDefault()
        this.setState({ error: null })
        const person_name = this.state.formPersonName
        const user_id = RmbrApiService.getUserId()
        const type_of_person  = this.state.selectedOption
        const person_id = this.props.person_id
        const newPerson = { person_name, user_id, type_of_person }
        RmbrApiService.editPerson(person_id, newPerson)
            .then(res => res.json())
            .then(data => {
                this.context.setPerson(data)
                this.handleHideForm()
            })
            .catch(res => {
                console.log('here is data on CATCH:',res)
                this.setState({error: res.error})
            })
    }

    render() {
        return (
            <form onSubmit={e => this.handleEditPersonSubmit(e)}>
                <legend>Add Person</legend>
                <div>
                    <label>Name</label>
                    <Input
                        name='personName'
                        id='personName'
                        value={this.state.formPersonName}
                        onChange={this.handleNameChange}
                    />
                </div>
                <div>
                    {this.renderCategoryOptions()}
                </div>
                <div>
                    <button>Submit</button>
                    <button
                        onClick={() => this.handleHideForm()}
                    >
                        Cancel
                    </button>
                </div>
            </form>


        )
    }
}