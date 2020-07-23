// component shows a person and their rmbrs
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// components
import RmbrList from '../../List/Rmbr/RmbrList';
import EditPersonForm from "../../Form/Person/Edit/EditPersonForm";
import { Button } from '../../Utils/Utils';

// utils
import PrettyDate, { findRmbrByPersonId } from "../../Utils/helpers";

// contexts / services
import RmbrmeContext from "../../../contexts/RmbrmeContext";
import AppApiService from "../../../services/app-api-service";
import { AppContext } from "../../../contexts/AppContext";

// styling
import './PersonPage.scss'; 
import PersonMenu from '../../Menu/Person/PersonMenu';

const PersonPage = props => {

    const [ showForm, setShowForm ] = useState(false);
    const [ id, setId ] = useState(props.match.params.person_id);
    const [ error, setError ] = useState(null);
    const [ rmbrs, setRmbrs ] = useState([]);
    const [ person, setPerson ] = useState({});
    const history = useHistory();

    let context = useContext(RmbrmeContext);
    let appContext = useContext(AppContext);

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

    useEffect(() => {
        let contextRmbrs = appContext.state.rmbrs;
        setRmbrs( contextRmbrs.filter(r => r.person_id == props.match.params.person_id) );
    }, [ appContext ])

    const handleHideEditForm = () => {
        setShowForm(false);
    };

    const handleShowEditForm = () => {
        setShowForm(true);
    };

    const handleDelete = () => {

    };

    const renderHeader = () => {
        return (
            <div className="person-header"> 
            <h2>
                { person.person_name }
            </h2>
            <h3>
                { person.type_of_person } since { PrettyDate(person.date_created || new Date()) }
            </h3>
            <PersonMenu
                handleEditClick={ () => handleShowEditForm() }
                handleDeleteClick={ e => handleDelete(e) }
            />
        </div>
        );
    };

    const renderEdit = () => {
        return (
            <EditPersonForm 
                person={ person }
                handleCancelClick={ () => handleHideEditForm() }
            />
        );
    };

    const handleConfirmDelete = (e, id) => {
        if ( window.confirm(`Are you sure you want to delete this person?`)) {
            e.preventDefault();
            setError(null);
            AppApiService.deletePerson(id)
                .then(() => {
                    appContext.dispatch({
                        type: 'refetch'
                    });
                })
                .then(() => {
                    history.push('/');
                })
                .catch(err => {
                    setError(err);
                })
        } 
    };

    return (

        <div>

            { showForm ? renderEdit() : renderHeader() }

            <Button
                label='Back'
                className='back_to_root_button'
                onClick={ () => history.push('/') }
            />
        
            <div>
                <RmbrList 
                    id={id}
                    person={ person }
                    rmbrs={ rmbrs }
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