import React, { Component } from 'react';
import { Input, Button, Textarea } from '../Utils/Utils';
import RmbrContext from "../../contexts/RmbrContext";
import {Link} from "react-router-dom";
import RmbrApiService from "../../services/rmbr-api-service";

export default class AddRmbrForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rmbrTitle: '',
            error: null,
            onAddRmbrSuccess: () => {}
        }
    };

    static contextType = RmbrContext;

    handleTitleChange = changeEvent => {
        this.setState({
            rmbrTitle: changeEvent.target.value
        })
    };


    handleSubmitRmbr = e => {
        // this.context.addRmbr
        e.preventDefault()
        this.setState({error: null});
        const rmbr_title = this.state.rmbrTitle
        const person_id = this.props.person_id
        const user_id = this.context.user_id
        const newRmbr = { rmbr_title, person_id, user_id };
        RmbrApiService.postRmbr(newRmbr)
            .then(() => {
                this.context.addRmbr(newRmbr)
                this.setState({
                    rmbrTitle: ''
                })
                this.state.onAddRmbrSuccess(newRmbr)
            })
            .catch(res => {
                this.setState({
                    error:res.error
                })
            })
        };

    render() {
        const today = new Date();
        console.log('today is', today)
        return (
            <form
                onSubmit={(e) => this.handleSubmitRmbr(e)}
            >
                <legend>Add Rmbr</legend>
                <div>
                   <Input
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