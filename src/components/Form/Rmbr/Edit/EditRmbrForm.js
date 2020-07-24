// component to edit an existing rmbr
import React, { Component, useState, useContext } from 'react';

// context
import RmbrmeContext from "../../../../contexts/RmbrmeContext";
import { AppContext } from "../../../../contexts/AppContext";

// service
import AppApiService from "../../../../services/app-api-service";

// utils
import { Textarea, Button } from "../../../Utils/Utils";
import { findRmbrByPersonId } from "../../../Utils/helpers";

// style
import './EditRmbrForm.scss'

const EditRmbrForm = props => {

    const [ id, setId ] = useState(props.rmbr.id)
    const [ rmbr, setRmbr ] = useState(props.rmbr);
    const [ error, setError ] = useState(null);
    const context = useContext(AppContext);

    const handleHide = e => {
        e.preventDefault();
        props.onHideEditForm();
    };

    const handleSubmit = e => {
        e.preventDefault();
        const editedRmbr = { rmbr_title: rmbr.rmbr_title }
        AppApiService.editRmbr(id, editedRmbr)
            .then(res => {
                let returnedRmbr = res.find(rbr => rbr.id === id)
                props.onEditRmbrSuccess(returnedRmbr);
            })
    };

    return (
        <form onSubmit={ e => handleSubmit(e) }>
            <legend>Edit Rmbr</legend>
            <Textarea
                value={ rmbr.rmbr_title }
                onChange={ e => setRmbr({ rmbr_title: e.target.value }) }
                autoFocus
            />
            <Button
                label="Save"
                type="submit"
            />
            <Button
                label="Cancel"
                onClick={ e => handleHide(e) }
            />
        </form>
    );

};

export default EditRmbrForm;

/*

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
        AppApiService.editRmbr(rmbr_id, EditedRmbr)
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
                        autoFocus={!this.props.autofocus}
                    />
                    <Button
                        label="Save"
                        className='edit_save_button edit_button'
                    />
                    <Button
                        label="Cancel"
                        className='edit_button'
                        onClick={e => this.handleHideForm(e)}
                    />
                </div>
            </form>
        );
    };
};

*/