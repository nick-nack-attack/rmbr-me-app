import React, { Component } from "react";
import RmbrmeContext from "../../contexts/RmbrmeContext";
import RmbrApiService from "../../services/rmbr-api-service";
import EditRmbrForm from "../EditRmbrForm/EditRmbrForm";
import './RmbrListItem.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrettyDate from "../Utils/Utils";

export default class RmbrListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            onDeleteRmbrSuccess: () => {},
            editFormDisplayed: false,
            autofocus: false,
            error: null,
            onCancelEdit: () => {}
        }
    };

    static contextType = RmbrmeContext;

    handleDeleteRmbr = rmbr_id => {
        this.setState({error: null});
        RmbrApiService.deleteRmbr(rmbr_id)
            .then(this.context.deleteRmbr(rmbr_id))
            .catch(res => {
                this.setState({error: 'Error deleting rmbr'})
                })
    };

    onHideEditForm = e => {
        this.setState({
            editFormDisplayed: false,
            autofocus: false
        })
    };

    handleShowEditForm = selected => {
        this.setState({
            autofocus: selected,
            editFormDisplayed: true
        })
    };

    renderRmbr = (rmbr_id) => {
        const dateCreated = this.props.rmbr.date_created
        return (
            <>
            <div className="Rmbr">
                <div className="rmbr_header_wrapper">
                    <div className="rmbr_title">
                        <h4>
                            { this.props.rmbr.rmbr_title }
                            <span className='edit_title_inline_button'>
                                <button onClick={() => this.handleShowEditForm(true)}><FontAwesomeIcon icon='pen' /></button>
                            </span>
                        </h4>
                        <h5 className='rmbr_added_label'>
                            <span><FontAwesomeIcon id='date_added_bolt' icon='bolt'/></span>
                            <span>
                            { dateCreated
                                ? PrettyDate(dateCreated)
                                : 'Rmbr'
                            }
                        </span>
                        </h5>
                    </div>
                </div>
                <div className="rmbr_description">
                    <p>{ this.props.rmbr.rmbr_text }</p>
                </div>
                <div className='rmbr_add_details_button'>
                    <button onClick={() => this.handleShowEditForm(false)}>
                        <span>
                            <FontAwesomeIcon
                            className='inline_before_icon'
                                icon='plus'
                            />
                                Add Details
                        </span>
                    </button>
                    <button
                        onClick={() => this.handleDeleteRmbr(rmbr_id)}
                        className='rmbr_list_delete-button'
                    >
                        <FontAwesomeIcon icon='trash-alt' />
                    </button>
                </div>
            </div>

                </>
        )
    };

    render() {
        const rmbr_id = this.props.id
        return (
            <li key={rmbr_id} className='Rmbr_list_item'>
                { this.state.editFormDisplayed === true
                    ?   <EditRmbrForm
                            rmbr={this.props.rmbr}
                            autofocus={ this.state.autofocus }
                            onHideEditForm={e => this.onHideEditForm(e)}
                        />
                    : this.renderRmbr(rmbr_id)
                }
            </li>
        )
    }
}

//format(new Date(this.props.rmbrArray.find(rbr => rbr.person_id === this.props.person.id).date_created), 'MMM, do Y')
//format(new Date(dateCreated), 'MMM, do Y')