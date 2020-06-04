import React, { Component } from 'react';
import { Input, Button } from '../Utils/Utils';
import RmbrApiService from "../../services/rmbr-api-service";
import RmbrmeContext from "../../contexts/RmbrmeContext";

export default class AddPersonForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formPersonName: '',
            selectedOption: 'Friend',
        };
    };

    static contextType = RmbrmeContext;

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    renderCategoryOptions() {
        const CategoryOptions = ['Friend', 'Co-Worker', 'Family'];
        return CategoryOptions.map((option, index) => {
            return (
                <label
                    htmlFor={option}
                    key={index}
                >
                    <input
                        name='selectedOption'
                        type='radio'
                        className='add_person_input'
                        value={option}
                        checked={this.state.selectedOption === option}
                        onChange={(e) => this.handleInputChange(e)}
                    />
                    {option}
                </label>
            );
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ error: null });
        const person_name = this.state.formPersonName;
        const user_id = RmbrApiService.getUserId();
        const type_of_person  = this.state.selectedOption;
        const newPerson = { person_name, user_id, type_of_person };
        RmbrApiService.postPerson(newPerson)
            .then(res => {
                this.context.addPerson(res);
                this.setState({formPersonName: ''});
            })
            .catch(res => {
                this.setState({error: res.error});
            })
    };

    render() {
        return (
            <form
                className='add_person_form'
                onSubmit={(ev) => this.handleSubmit(ev)}
            >
                <legend>Add Person</legend>
                <div>
                    <Input
                        name='formPersonName'
                        id='personName'
                        placeholder='Type Person Here'
                        value={this.state.formPersonName}
                        onChange={(e) => this.handleInputChange(e)}
                    />
                </div>
                <div className='add_person_radio_options'>
                    {this.renderCategoryOptions()}
                </div>
                <div>
                    <Button
                        disabled={!this.state.formPersonName}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        );
    };
};