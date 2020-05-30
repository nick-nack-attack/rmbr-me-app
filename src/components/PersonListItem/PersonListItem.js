import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import RmbrmeContext from "../../contexts/RmbrmeContext";
import RmbrApiService from "../../services/rmbr-api-service";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns'

export default class PersonListItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
        }
    }

    static contextType = RmbrmeContext;

    handleDeletePerson = (e, personId) => {
        e.stopPropagation();
        this.setState({error: null})
        RmbrApiService.deletePerson(personId)
            .then(this.context.deletePerson(personId))
            .catch(res => {
                this.setState({
                    error: res.error
                })
            })
    };

    render() {
        // console.log(this.props.person.date_created)
        // console.log( format(new Date(this.props.person.date_created), 'MMM, do Y'))

        const makeARmbrPromptButton = <Link to={`/person/${this.props.person.id}`}><button> <FontAwesomeIcon icon='plus' /> Create a Rmbr </button></Link>
        const arrayLength = this.props.rmbrArray.length
        const PersonRmbrList = !arrayLength
            ? makeARmbrPromptButton
            : (this.props.rmbrArray.find(rbr => rbr.person_id === this.props.person.id)).rmbr_title



    return (
        <>
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
                        { PersonRmbrList }
                        <div>
                            {/*{ !arrayLength*/}
                            {/*    ? ''*/}
                            {/*    : format(new Date(this.context.rmbrArray.find(rbr => rbr.person_id === this.props.person.id).date_created), 'MMM, do Y')*/}
                            {/*}*/}
                        </div>
                    </div>
                </div>
            </li>
        </Link>
            <button
                className='list_delete_button person_list_db'
                onClick={(e) => this.handleDeletePerson(e, this.props.person.id)}
            >
                <FontAwesomeIcon icon='trash-alt' />
            </button>
        </>
        )
    }
};