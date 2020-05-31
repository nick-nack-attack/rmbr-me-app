import React, { Component } from 'react';
import { Input, Button } from '../Utils/Utils';
import RmbrApiService from "../../services/rmbr-api-service";
import RmbrmeContext from "../../contexts/RmbrmeContext";

export default class AddRmbrForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rmbrTitle: '',
            error: null,
            onAddRmbrSuccess: () => {}
        }
    };

    static contextType = RmbrmeContext;

    handleTitleChange = changeEvent => {
        this.setState({
            rmbrTitle: changeEvent.target.value
        })
    };


    handleSubmitRmbr = e => {
        // this.context.addRmbr
        e.preventDefault()
        this.setState({error: null});
        const rmbr_title = this.state.rmbrTitle;
        const rmbr_text = ''
        const person_id = this.props.person_id;
        const user_id = window.localStorage.getItem('user_id');
        const category = 'Past';
        const newRmbr = { rmbr_title, category, rmbr_text, person_id, user_id };
        RmbrApiService.postRmbr(newRmbr)
            .then(() => {
                this.context.addRmbr(newRmbr)
                this.setState({
                    rmbrTitle: ''
                })
                this.props.onAddRmbrSuccess(newRmbr)
            })
            .catch(res => {
                this.setState({
                    error:res.error
                })
            })
        };

    render() {
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
                    <Button>Submit</Button>
                </div>
            </form>
        )
    }

}