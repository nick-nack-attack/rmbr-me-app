import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RmbrApiService from "../../services/rmbr-api-service";
import RmbrList from '../../components/RmbrList/RmbrList'
import EditPersonForm from "../../components/EditPersonForm/EditPersonForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../components/Utils/Utils";
import RmbrmeContext from "../../contexts/RmbrmeContext";
import { findPersonById } from '../../helpers'


export default class PersonPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editFormDisplayed: false,
            person_id: this.props.match.params.person_id
        }
    };

    static contextType = RmbrmeContext;

    componentDidMount() {
       RmbrApiService.getPersonByPersonId(this.state.person_id)
           .then( person => {
               this.context.setSelectedPerson(person)
           })
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
        const person_name = this.context.selected_person.person_name
        const type_of_person = this.context.selected_person.type_of_person || '';
        const { error } = this.context;

        return (
            <div>
                <header>
                    { !this.state.editFormDisplayed
                        ?   <>
                                <div className='person_page_header'>
                                    <h2>
                                        {person_name}
                                        <span className='edit_title_inline_button'>
                                            <button
                                                onClick={() => this.handleEditPerson(person_id)}
                                            >
                                                <FontAwesomeIcon icon='pen' />
                                            </button>
                                        </span>
                                    </h2>
                                    <h3> {type_of_person} </h3>
                                </div>
                                <div className='person_page_delete_button_div'>
                                    <button
                                        onClick={() => this.handleDeletePerson(person_id)}
                                    >
                                        <FontAwesomeIcon icon='trash-alt' /><span> Delete Person</span>
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
                <Link to={'/'}>
                <Button>
                    <FontAwesomeIcon id='arrow-left' icon='arrow-left'/>
                    Back to My People
                </Button>
                </Link>
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
                    <Link to={'/'}>
                        <Button>
                            <FontAwesomeIcon id='arrow-left' icon='arrow-left'/>
                            Back to My People
                        </Button>
                    </Link>
                </div>
            </div>
            </div>
            </div>
        )
    }
}