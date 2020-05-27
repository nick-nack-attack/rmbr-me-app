import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { NiceDate, PrettyDate } from '../Utils/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import StyleIcon from '../StyleIcon/StyleIcon'

import PersonContext from "../../contexts/PersonContext";
import RmbrApiService from "../../services/rmbr-api-service";

import { toDate } from 'date-fns'
import { format } from 'date-fns'
import {findRmbrByPersonId} from "../../helpers";


export default class PersonListItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
        }
    }

    static contextType = PersonContext;

    handleDeletePerson = personId => {
        this.setState({error: null})
        RmbrApiService.deletePerson(personId)
            .then(this.context.deletePerson(personId))
            .catch(res => {
                this.setState({
                    error: res.error
                })
            })
    }

    render() {
        // console.log(this.props.person.date_created)
        // console.log( format(new Date(this.props.person.date_created), 'MMM, do Y'))

        const makeARmbrPromptButton = <Link to={`/person/${this.props.person.id}`}><button> <FontAwesomeIcon icon='plus' /> Create a Rmbr </button></Link>
        const arrayLength = this.props.rmbrArray.length
        const PersonRmbrList = !arrayLength
            ? makeARmbrPromptButton
            : (this.props.rmbrArray.find(rbr => rbr.person_id === this.props.person.id)).rmbr_title



    return (
        <Link to={`/person/${this.props.person.id}`}>
            <li
                key={this.props.person.id}
                className='PersonListItem'
            >
                <h3 className='PersonListItem__heading'> { this.props.person.person_name } </h3>
                <p className='person_category'>{ this.props.person.type_of_person } <FontAwesomeIcon icon='bolt'/> {this.props.person.number_of_rmbrs} rmbrs</p>
                <div
                    className='latest_rmbr'
                >
                    { !arrayLength ? `No Rmbrs Yet!` : `` }
                    <div>
                        <div>{ PersonRmbrList }</div>
                        <div>
                            { !arrayLength
                                ? ''
                                : format(new Date(this.props.rmbrArray.find(rbr => rbr.person_id === this.props.person.id).date_created), 'MMM, do Y')
                            }
                        </div>
                    </div>
                </div>

                        <button
                            className='personListItem__button'
                            onClick={() => this.handleDeletePerson(this.props.person.id)}
                        >
                            <FontAwesomeIcon icon='trash-alt' /><span> Delete</span>
                        </button>

            </li>
        </Link>
        )
    }
};

function PersonStyle({ person }) {
    return (
        <span>
            { person.style }
        </span>
    )
};

function PersonAddedDate({ person }) {
    return (
        <span>
            <NiceDate/>
        </span>
    )
};

function PersonRmbrCount({ person }) {
    return (
        <span>
            <span>
                {'2'}
            </span>
        </span>
    )
};