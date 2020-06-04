import React, { Component } from 'react';
import RmbrApiService from "../../services/rmbr-api-service";
import RmbrmeContext from "../../contexts/RmbrmeContext";

import { Input, Section, Button } from "../Utils/Utils";

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
        const user_id = RmbrApiService.getUserId();
        const type_of_person  = this.state.selectedOption;
        const person_id = this.props.person_id;
        const newPerson = { person_name, user_id, type_of_person };
        RmbrApiService.editPerson(person_id, newPerson)
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