import React, { Component } from 'react';
import RmbrmeContext from "../../contexts/RmbrmeContext";
import RmbrApiService from "../../services/rmbr-api-service";
import { Textarea, Button } from '../Utils/Utils';
import { findRmbrByPersonId } from "../../helpers";

export default class EditRmbrForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rmbrTitle: this.props.rmbr.rmbr_title,
            rmbrText: this.props.rmbr.rmbr_text,
            error: null,
            onCancelEdit: () => {},
            onHideEditForm: () => {}
        };
    };

    static contextType = RmbrmeContext;

    handleHideForm = event => {
        this.props.onHideEditForm();
    };

    handleTitleChange = event => {
        this.setState({
            rmbrTitle: event.target.value
        });
    };

    handleTextChange = event => {
        this.setState({
            rmbrText: event.target.value
        });
    };

    handleEditRmbrSubmit = e => {
        e.preventDefault();
        this.setState({error: null});
        const rmbr_title = this.state.rmbrTitle;
        const rmbr_text = this.state.rmbrText;
        const person_id = this.props.rmbr.person_id;
        const user_id = window.localStorage.getItem('user_id');
        const rmbr_id = this.props.rmbr.id;
        const EditedRmbr = { rmbr_title, rmbr_text, person_id, user_id, rmbr_id };
        RmbrApiService.editRmbr(rmbr_id, EditedRmbr)
            .then(res => res.json())
            .then(data => {
                this.context.setRmbrArray(findRmbrByPersonId(data, person_id));
                this.handleHideForm();
            })
            .catch(err => {
                this.setState({
                    error:err.error
                });
            })
    };

    render() {
        return (
            <form
                onSubmit={(e) => this.handleEditRmbrSubmit(e)}
            >
                <div>
                    <label>
                        Rmbr title
                    </label>
                    <Textarea
                        name='rmbrTitle'
                        id='rmbrTitle'
                        value={this.state.rmbrTitle}
                        onChange={this.handleTitleChange}
                        autoFocus={!!this.props.autofocus}
                    />
                    <label>
                        Rmbr text
                    </label>
                    <Textarea
                        name='rmbrText'
                        id='rmbrText'
                        value={this.state.rmbrText}
                        placeholder='Add details here'
                        onChange={this.handleTextChange}
                        autoFocus={!this.props.autofocus}
                    />
                    <Button
                        className='edit_save_button edit_button'
                    >
                        Save
                    </Button>
                    <Button
                        className='edit_button'
                        onClick={e => this.handleHideForm(e)}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        );
    };
};