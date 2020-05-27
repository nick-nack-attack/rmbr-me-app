import React, { Component } from "react";
import RmbrContext from "../../contexts/RmbrContext";
import RmbrApiService from "../../services/rmbr-api-service";
import EditRmbrForm from "../EditRmbrForm/EditRmbrForm";
import { NiceDate } from "../Utils/Utils";
import { Button, Textarea } from "../Utils/Utils";
import './RmbrListItem.css'
import { format } from 'date-fns'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

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

    static contextType = RmbrContext;

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

    handleEditRmbr = rmbrId => {
        this.setState({
            autofocus: false,
            editFormDisplayed: true
        })
    };

    handleAddMoreDetails = () => {
        this.setState({
            autofocus: true,
            editFormDisplayed: true
        })
    }

    renderRmbr = () => {
        //format(new Date(this.props.rmbrArray.find(rbr => rbr.person_id === this.props.person.id).date_created), 'MMM, do Y')
        //format(new Date(dateCreated), 'MMM, do Y')
        const dateCreated = this.props.rmbr.date_created
        return (
            <div>
                <header className='rmbr_item_header'>
                    <h4><b> {this.props.rmbr.rmbr_title} </b></h4>
                    <h5 className='rmbr_added_label'>
                        <span><FontAwesomeIcon icon='bolt'/></span>
                        <span>
                            { dateCreated
                                ? format(new Date(dateCreated), 'MMM, do Y')
                                : 'Rmbr'
                            }

                        </span>
                    </h5>
                    <p>
                        { this.props.rmbr.rmbr_text }
                    </p>
                </header>
                <div className={'rmbr_item_button_bar'}>
                    <button
                        onClick={() => this.handleEditRmbr()}
                    >
                        <span>
                            <FontAwesomeIcon icon='plus'/>
                            Add Details
                        </span>
                    </button>
                    <button
                        onClick={() => this.handleAddMoreDetails()}
                    >
                        <span>
                            <FontAwesomeIcon icon='pen' />
                            Edit
                        </span>
                    </button>
                    <button
                        onClick={() => this.handleDeleteRmbr()}
                        className='rmbr_list_item_delete_button'
                    >
                        <FontAwesomeIcon icon='trash-alt' />
                    </button>
                </div>
            </div>
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
