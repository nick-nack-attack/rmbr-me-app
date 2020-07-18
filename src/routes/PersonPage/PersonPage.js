import React, { Component, useState, useContext, useEffect } from 'react';
import AppApiService from "../../services/app-api-service";
import RmbrList from '../../components/RmbrList/RmbrList'
import EditPersonForm from "../../components/EditPersonForm/EditPersonForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../components/Utils/Utils";
import RmbrmeContext from "../../contexts/RmbrmeContext";
import PrettyDate from "../../components/Utils/Utils";
import { useHistory } from 'react-router-dom';

import './PersonPage.scss'; 

const PersonPage = (props) => {

    const [ showForm, setShowForm ] = useState(false);
    const [ id, setId ] = useState(props.match.params.person_id);
    const [ error, setError ] = useState(null);
    const [ person, setPerson ] = useState({});
    const history = useHistory();
    

    let context = useContext(RmbrmeContext);

    useEffect(() => {
        AppApiService.getPersonByPersonId(id)
            .then(person => {
                context.setSelectedPerson(person);
                setPerson(person);
            })
            .catch(err => {
                context.setError(err);
            });
    }, [id]);

    const handleHideEditForm = () => {
        setShowForm(false);
    };

    const handleShowEditForm = () => {
        setShowForm(true);
    };

    // const handleDeletePerson = e => {
    //     if (window.confirm(`Are you sure you want to delete this person?`)) {
    //         e.preventDefault();
    //         setError(null);
    //         AppApiService.deletePerson(id)
    //             .then(() => {
    //                 context.deletePerson(id);
    //             })
    //             .then(() => {
    //                 history.push('/');
    //             })
    //             .catch(err => {
    //                 setError(err);
    //             })
    //     };
    // };
    
    const backButton = () => {
        return (
            <Button
                className='back_to_root_button'
                onClick={() => this.props.history.push('/')}
            >
                <FontAwesomeIcon id='arrow-left' icon='arrow-left'/>
                Back
            </Button>
        );
    };

    return (

        <div>
            
                <div className="person-header">
                    
                        <h2>
                            { person.person_name }
                        </h2>
                        <h3>
                            { person.type_of_person }
                        </h3>
                        <h4>
                            { PrettyDate(person.date_created || new Date()) }
                        </h4>
                    
                    <div className="options-div">
                        <Button 
                            className="icon-button"
                        >        
                            <span class="material-icons">create</span>
                        </Button>
                        <Button 
                            className="icon-button"
                            //onClick={e => handleDeletePerson(e)}
                        >
                            <span class="material-icons">delete</span>
                        </Button>
                    </div>

                    {<EditPersonForm
                                person_id={person.person_id}
                                person_name={person.person_name}
                                type_of_person={person.type_of_person}
                                onHideEditForm={e => handleHideEditForm(e)}
                    />}

                </div>
                
                
        
            <div>
                <RmbrList 
                    person_id = { id }
                    rmbrList = { context.rmbrList }
                />
            </div>

        </div>

        /*
        <div key={person_id}>
                <header>
                    { !this.state.editFormDisplayed
                        ?   <>
                                <div className='person_page_header'>
                                    <h2>
                                        { person_name }
                                        <span className='edit_title_inline_button'>
                                            <button
                                                onClick={() => this.handleEditPerson()}
                                            >
                                                <FontAwesomeIcon icon='pen' />
                                            </button>
                                                <div className='person_page_delete_button_div'>
                                                    <button
                                                        className='list_delete_button'
                                                        onClick={(e) => this.handleDeletePerson(e)}
                                                    >
                                                        <FontAwesomeIcon icon='trash-alt' />
                                                    </button>
                                                </div>
                                        </span>
                                    </h2>
                                    <h3> {type_of_person}</h3>
                                    <p>Added {PrettyDate(date_created)}</p>
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
                    { this.renderBackButton() }
                </div>
            </div>
            </div>
            </div>
            */
    );

};

export default PersonPage;