import React, { Component } from "react";
import RmbrmeContext from "../../contexts/RmbrmeContext";
import RmbrApiService from "../../services/rmbr-api-service";
import EditRmbrForm from "../EditRmbrForm/EditRmbrForm";
import './RmbrListItem.css'
import { format } from 'date-fns'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class RmbrListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            onDeleteRmbrSuccess: () => {},
            editFormDisplayed: false,
            autofocus: false,
            onCancelEdit: () => {}
        }
    };

    static contextType = RmbrmeContext;

    handleDeleteRmbr = rmbrId => {
        this.setState({error: null});
        RmbrApiService.deleteRmbr(rmbrId)
            .then(this.context.deleteRmbr(rmbrId))
            .catch(res => {
                console.log('Error deleting Rmbr', res)
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

    renderRmbr = () => {
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
                                ? format(new Date(dateCreated), 'MMM d, Y')
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
                </div>
                <button
                    onClick={() => this.handleDeleteRmbr()}
                    className='list_delete_button rmbr_list_db'
                >
                    <FontAwesomeIcon icon='trash-alt' />
                </button>
            </div>

                </>
        )
    };

    render() {
        return (
            <li key={this.props.id} className='Rmbr_list_item'>
                { this.state.editFormDisplayed === true
                    ?   <EditRmbrForm
                            rmbr={this.props.rmbr}
                            autofocus={ this.state.autofocus }
                            onHideEditForm={e => this.onHideEditForm(e)}
                        />
                    : this.renderRmbr()
                }
            </li>
        )
    }
}

//format(new Date(this.props.rmbrArray.find(rbr => rbr.person_id === this.props.person.id).date_created), 'MMM, do Y')
//format(new Date(dateCreated), 'MMM, do Y')