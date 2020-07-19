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

// components
import SearchForPerson from '../Form/SearchForPerson/SearchForPerson';
import AddPerson from '../Form/AddPerson/AddPerson';
import PersonForm from '../Form/PersonForm/PersonForm';

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

    const handleChange = e => {
        setSearchTerm(e);
    };

    useEffect(() => {

        setPeople(appContext.state.people);
        setRmbrs(appContext.state.rmbrs);

    }, [appContext]);

    useEffect(() => {

        const filterBySearch = people.filter(r => r.person_name.toLowerCase().includes(searchTerm.toLowerCase()));
        setResults(filterBySearch);

    }, [searchTerm])


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
    );    

    return (

        <>
            <AddPerson/>
                {' — '}
            <SearchForPerson searchName={e => handleChange(e)}/>
            <h2>
                You have { people && people.length } people with { rmbrs && rmbrs.length } rmbrs.
            </h2>
            { people === undefined
                ? (
                    renderemptystate
                ) 
                : ''}
            <ul>
                { 
                    ( searchTerm.length === 0
                        ? people 
                        : people ).map((person, index) => {
                            return (
                                <Person
                                    key={ index }
                                    person={ person }
                                    array={ findRmbrByPersonId(rmbrs, person.id) }
                                    handleClickPerson={ person_id => handleClick(person_id) }
                                />
                            );
                        })
                }
            </ul>
        </>

    )

};

export default PersonList;