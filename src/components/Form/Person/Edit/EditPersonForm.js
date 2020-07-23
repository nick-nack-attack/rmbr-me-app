import React, { Component, useState } from 'react';
import AppApiService from "../../../../services/app-api-service";
import RmbrmeContext from "../../../../contexts/RmbrmeContext";

import { Input, Section, Button } from "../../../Utils/Utils";

const EditPersonForm = props => {

    const [ person, setPerson ] = useState(props.person);
    const [ error, setError ] = useState(null);

    const handleCancelClick = e => {
        e.preventDefault();
        props.handleCancelClick();
    };

    const handleChange = e => {
        console.log('THIS FIRED')
        setPerson({
            type_of_person: e.target.value
        })
    };

    const renderOptions = () => {
        const categories = ['Family', 'Friend', 'Co-Worker'];
        return (
            <select>
                { 
                    categories.map(type => {
                        return (
                            <option
                                selected={ person.type_of_person === type }
                                value={type}
                                onChange={ e => handleChange(e)}
                            >
                                {type}
                            </option>
                        )
                    }) }
            </select>
        )
    }

    return (
        <Section>
            <form>
                <legend>Edit Person</legend>
                <Input
                    value={ person.person_name }
                    onChange ={ e => setPerson({person_name: e.target.value}) }
                />
                { renderOptions() }
                <Button
                    label="Save"
                />
                <Button
                    label="Cancel"
                    onClick={ e => handleCancelClick(e) }
                />
            </form>
        </Section>
    );

};

export default EditPersonForm;

/*

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
        };
    };

    static contextType = RmbrmeContext;

    handleHideForm = e => {
        this.props.onHideEditForm();
    };

    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    handleNameChange = changedName => {
        this.setState({
            formPersonName: changedName.target.value
        });
    };

    renderCategoryOptions() {
        return (
            <>
                <label>
                    <input
                        id='Friend'
                        type='radio'
                        value='Friend'
                        checked={this.state.selectedOption === 'Friend'}
                        onChange={this.handleOptionChange}
                    />
                        Friend
                </label>
                <label>
                    <input
                        id='Family'
                        type='radio'
                        value='Family'
                        checked={this.state.selectedOption === 'Family'}
                        onChange={this.handleOptionChange}
                    />
                        Family
                </label>
                <label>
                    <input
                        id='Co-Worker'
                        type='radio'
                        value='Co-Worker'
                        checked={this.state.selectedOption === 'Co-Worker'}
                        onChange={this.handleOptionChange}
                    />
                        Co-Worker
                </label>
            </>
        );
    };

    handleEditPersonSubmit = e => {
        e.preventDefault();
        this.setState({ error: null });
        const person_name = this.state.formPersonName;
        const user_id = AppApiService.getUserId();
        const type_of_person  = this.state.selectedOption;
        const person_id = this.props.person_id;
        const newPerson = { person_name, user_id, type_of_person };
        AppApiService.editPerson(person_id, newPerson)
            .then(res => res.json())
            .then(data => {
                this.context.setSelectedPerson(data);
                this.handleHideForm();
            })
            .catch(res => {
                this.setState({error: res.error});
            })
    };

    render() {
        return (
            <Section
                className='edit_person_section'
            >
                <form
                    className='edit_person_form'
                    onSubmit={e => this.handleEditPersonSubmit(e)}
                >
                    <legend
                        className='edit_label'
                    >
                        Edit Person
                    </legend>
                    <div>
                        <label>Name</label>
                        <Input
                            name='personName'
                            id='personName'
                            value={this.state.formPersonName}
                            onChange={this.handleNameChange}
                        />
                    </div>
                    <div
                        className='edit_person_radio_options'
                    >
                        {this.renderCategoryOptions()}
                    </div>
                    <div>
                        <Button
                            className='edit_save_button'
                        >
                            Save
                        </Button>
                        <Button
                            onClick={() => this.handleHideForm()}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Section>
        );
    };
};

*/