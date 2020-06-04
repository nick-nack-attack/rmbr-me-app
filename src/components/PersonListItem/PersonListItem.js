import React, {Component} from 'react';
import RmbrmeContext from "../../contexts/RmbrmeContext";
import RmbrApiService from "../../services/rmbr-api-service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class PersonListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            handleClickPerson: () => {}
        };
    };

    static contextType = RmbrmeContext;

    handleClickPerson = (person_id) => {
        this.props.handleClickPerson(person_id);
    }

    handleDeletePerson = (e, personId) => {
        e.stopPropagation();
        this.setState({error: null});
        RmbrApiService.deletePerson(personId)
            .then(this.context.deletePerson(personId))
            .catch(res => {
                this.setState({
                    error: res.error
                });
            })
    };

    render() {
        const person_id = this.props.person.id;
        const makeARmbrPromptButton = <button onClick={() => this.handleClickPerson(person_id)}> <FontAwesomeIcon icon='plus' /> Create a Rmbr </button>;
        const arrayLength = this.props.rmbrArray.length;
        const PersonRmbrList = !arrayLength
            ? makeARmbrPromptButton
            : (this.props.rmbrArray.find(rbr => rbr.person_id === this.props.person.id)).rmbr_title
        const rmbrOrRmbrs = arrayLength === 1 ? 'rmbr' : 'rmbrs';

    return (
        <>
            <li
                key={person_id}
                className='PersonListItem'
                onClick={() => this.handleClickPerson(person_id)}
            >
                <button
                    className='list_delete_button person_list_delete-button'
                    onClick={(e) => this.handleDeletePerson(e, this.props.person.id)}
                >
                    <FontAwesomeIcon icon='trash-alt' />
                </button>
                <h3
                    className='PersonListItem__heading'
                >
                    { this.props.person.person_name }
                </h3>
                <p className='person_category'>{ this.props.person.type_of_person } <FontAwesomeIcon icon='bolt'/> {this.props.rmbrArray.length} {rmbrOrRmbrs}</p>
                <div
                    className='latest_rmbr'
                >
                    { !arrayLength ? `No Rmbrs Yet!` : `` }
                    <div>
                        { PersonRmbrList }
                    </div>
                </div>
            </li>
        </>
        );
    };
};