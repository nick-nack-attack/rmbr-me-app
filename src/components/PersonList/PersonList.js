import React, { Component, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import PersonListItem from "../../components/PersonListItem/PersonListItem";
import AddPersonForm from '../../components/AddPersonForm/AddPersonForm';
import emptyStateForPersonList from '../../assets/empty_people.png';
import AppApiService from '../../services/app-api-service';
import RmbrmeContext from "../../contexts/RmbrmeContext";

import { AppContext } from '../../contexts/AppContext';

import { findRmbrByPersonId } from "../../helpers";
import { Input } from '../Utils/Utils';

import Person from '../Person/Person';

const PersonList = () => {

    // set context
    let appContext = useContext(AppContext);
    const history = useHistory();

    const [ people, setPeople ] = useState([]);
    const [ rmbrs, setRmbrs ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState('');
    const [ results, setResults ] = useState([]);

    const handleClick = (id) => {
        history.push(`/person/${id}`);
    };

    useEffect(() => {
        setPeople(appContext.state.people);
        setRmbrs(appContext.state.rmbrs);
    }, [appContext])

    const renderemptystate = (
        
            <div>
                <img
                    src={ emptyStateForPersonList }
                    alt={ "lightning says he's lonely" }
                />
                <div>
                    <p>Add a person to start!</p>
                </div>
            </div>
        )
    

    return (

        <>
            <AddPersonForm/>
            <Input placeHolder="Search"/>
            <h2>
                You have { people && people.length } people with { rmbrs && rmbrs.length } rmbrs.
            </h2>
            { people === undefined
                ? (
                    renderemptystate
                ) 
                : ''}
            <ul>
                { people && people.map((person, index) => {
                    return (
                        <Person
                            key={ index }
                            person={ person }
                            array={ findRmbrByPersonId(rmbrs, person.id) }
                            handleClickPerson={ person_id => handleClick(person_id) }
                        />
                    )
                }) }
            </ul>
        </>

    )

};

export default PersonList;