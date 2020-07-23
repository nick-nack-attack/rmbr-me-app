// component displays list of people user has
import React, { Component, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// context
import { AppContext } from '../../../contexts/AppContext';

// service / util
import AppApiService from '../../../services/app-api-service';
import { findRmbrByPersonId } from "../../Utils/helpers";

// component
import AddPersonForm from '../../Form/Person/Add/AddPersonForm';
import PersonItem from "../../Item/Person/PersonItem";

// style
import emptyStateImage from "../../../assets/empty_people.png"

// components

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
    }, [ appContext ]);

    useEffect(() => {
        const filterBySearch = people.filter(r => r.person_name.toLowerCase().includes(searchTerm.toLowerCase()));
        setResults(filterBySearch);
    }, [ searchTerm ])


    const renderemptystate = (
        <div>
            <img
                src={ emptyStateImage }
                alt="lightning says he's lonely"
            />
            <div>
                <p>Add a person to start!</p>
            </div>
        </div>
    );    

    const renderPeople = () => {
        return (
        people.map(person => {
            return (
                <PersonItem 
                    person={person} 
                    // pass in only the rmbrs the person has
                    array={ findRmbrByPersonId(rmbrs, person.id) }
                    handleClickPerson={ id => handleClick(id) }
                />
            )
        })
        )
    };

    const renderAnnoucement = () => {
        return (
            <h2>
                You have { people.length } with { rmbrs.length } rmbrs.
            </h2>
        )
    }

    return (

        <>

        <AddPersonForm />

        { renderAnnoucement() }
        
        { people === undefined ? renderemptystate : '' }

        { renderPeople() }

        </>

    );

};

export default PersonList;