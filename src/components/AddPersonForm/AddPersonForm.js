import React, { Component } from 'react';
import { Button, Textarea } from '../Utils/Utils';
import RmbrMeContext from "../../contexts/RmbrMeContext";
import {Link} from "react-router-dom";
import PeopleApiService from "../../services/person-api-service";

export default class AddPersonForm extends Component {

    static contextType = RmbrMeContext;

    goBack = () => {
        this.props.history.push('/my-people');
    };

    renderCategoryOptions() {
        return (
            <>
                <option>Select one..</option>
                <option value='Friend'>Friend</option>
                <option value='Co-Worker'>Co-Worker</option>
                <option value='Family'>Family</option>
            </>
        )
    }

    handleSubmit = ev => {
        ev.preventDefault()
        const { personName } = ev.target
        const { personCategory } = ev.target
        const { firstmet } = new Date();
        PeopleApiService.postPerson(personName, personCategory, 4, firstmet)
            .then(this.context.addPerson)
            .then(() => {
                personName.value = '';
                personCategory.value = '';
                this.props.onPersonPostSuccess()
            })
            .catch(res => {
                this.setState({error: res.error})
            })
    }

    render() {
        console.log(this.context.person)
        return (
            <form onSubmit={() => this.handleSubmit}>
                <legend>Add Person</legend>
                <div>
                    <label>Name</label>
                    <input name='personName' id='personName'/>
                </div>
                <div>
                    <label>Category</label>
                    <select name='personCategory' id='personCategory'>
                        <option>Select one..</option>
                        <option value='Friend'>Friend</option>
                        <option value='Co-Worker'>Co-Worker</option>
                        <option value='Family'>Family</option>
                    </select>
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>


        )
    }
}