import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PersonContext from "../../contexts/PersonContext";
import RmbrApiService from "../../services/rmbr-api-service";
import RmbrList from '../../components/RmbrList/RmbrList'
import { NiceDate, Hyph, Section } from "../../components/Utils/Utils";
import EditPersonForm from "../../components/EditPersonForm/EditPersonForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class PersonPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editFormDisplayed: false,
        }
    };

    static contextType = PersonContext;

    componentDidMount() {
       const person_id = this.props.match.params.person_id;
       this.context.clearError();
       this.context.setPersonId(person_id)
       RmbrApiService.getPersonByPersonId(person_id)
           .then( person => this.context.setPerson(person))
           .catch(err => {
               this.context.setError(err)
            })
    };

    onHideEditForm = e => {
        this.setState({
            editFormDisplayed: false
        })
    };

    handleDeletePerson = personId => {
        this.setState({error: null});
        RmbrApiService.deletePerson(personId)
            .then(this.context.deletePerson(personId))
            .then(this.props.history.push('/'))
            .catch(res => {
                console.log(res)
                this.setState({
                    error: res.error
                })
            })
    }

    handleEditPerson = personId => {
        this.setState({
            editFormDisplayed: true
        })
    };

    render() {

        const person_id = this.props.match.params.person_id;
        const person_name = this.context.person.person_name;
        const type_of_person = this.context.person.type_of_person;
        const { error } = this.context;

        return (
            <div>
                <header>
                    { !this.state.editFormDisplayed
                        ?   <>
                                <div className='person_page_header'>
                                    <h2> {person_name} </h2>
                                    <h3> {type_of_person} </h3>
                                </div>
                                <div>
                                    <button
                                        onClick={() => this.handleEditPerson(this.props.match.params.person_id)}
                                    >
                                        <FontAwesomeIcon icon='pen' />
                                    </button>
                                    <button
                                        onClick={() => this.handleDeletePerson(person_id)}
                                        className='personListItem__button'
                                    >
                                        <FontAwesomeIcon icon='trash-alt' />
                                    </button>
                                </div>
                            </>
                        :   <EditPersonForm
                                person_id={person_id}
                                person_name={person_name}
                                type_of_person={type_of_person}
                                onHideEditForm={e => this.onHideEditForm(e)}
                            />
                    }
                </header>
                <div>
                    { error
                        ?   <p className='red'>Could not load Rmbrs list</p>
                        :   <RmbrList
                            person_id={person_id}
                            rmbrList={this.context.rmbrList}
                            />
                    }
                <div>
                <div>
                    <Link to={'/'}><button>Back to My People</button></Link>
                </div>
            </div>
            </div>
            </div>
        )
    }
}