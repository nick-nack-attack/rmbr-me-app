import React, { Component } from 'react';
import { Button, Textarea } from '../Utils/Utils';
import RmbrMeContext from "../../contexts/RmbrMeContext";
import {Link} from "react-router-dom";
import PeopleApiService from "../../services/person-api-service";

export default class AddRmbrForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rmbrTitle: '',
            personId: this.props.personId,
            userId: this.props.userId,
            error: null,
            onAddRmbrSuccess: () => {}
        }
    }

    static contextType = RmbrMeContext;

    handleTitleChange = changeEvent => {
        this.setState({
            rmbrTitle: changeEvent.target.value
        })
    }


    handleSubmitRmbr = e => {
        e.preventDefault()
        this.setState({error: null});
        const rmbr_title = this.state.rmbrTitle
        const person_id = this.state.personId
        const user_id = this.state.userId
        console.log(`rmbrtitle: ${rmbr_title} personid: ${person_id} userid: ${user_id}`)
        const newRmbr = { person_id, rmbr_title, user_id };
        PeopleApiService.postRmbr(newRmbr)
            .then(res => {
                rmbr_title = 'A'
            })
        .catch(res => {
            this.setState({
                error:res.error
            })
        })
        }

    render() {
        return (
            <form
                onSubmit={(e) => this.handleSubmitRmbr(e)}
            >
                <div>
                    <input 
                        name='rmbrTitle'
                        id='rmbrTitle'
                        placeholder='Add a new rmbr here'
                        onChange={this.handleTitleChange}

                    />
                    <button>Submit</button>
                </div>
            </form>
        )
    }

}