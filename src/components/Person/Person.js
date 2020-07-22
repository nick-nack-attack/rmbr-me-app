// person component on main feed
import React, { Component, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// components
import { Button } from '../Utils/Utils';

// contexts
import { AppContext as appContext } from "../../contexts/AppContext";

// service
import AppApiService from "../../services/app-api-service";

// style
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Person.scss';

const Person = props => {

    // set context
    let context = useContext(appContext);

    // set variables
    const history = useHistory();
    const [ error, setError ] = useState(null);
    const [ person, setPerson ] = useState(props.person);
    const [ rmbrs, setRmbrs ] = useState(context.state.rmbrs);
    const [ secondary, setSecondary ] = useState();

    useEffect(() => {
        if (rmbrs) {
            setSecondary(
                /* rmbrs.find(rbr => rbr.person_id === person.id).rmbr_title */
            ) 
        } else {
            setSecondary(
                <button onClick={() => props.handleClickPerson(person.id)}>
                    <FontAwesomeIcon icon='plus' />
                        {' '}
                        Create a Rmbr
                </button>
            )
        };
    }, [props.array]);

    const handleClick = (id) => {
        props.handleClickPerson(id)
    };

    return (

        <li
            key={person.id}
            className="PersonListItem"
            onClick={() => handleClick(person.id)}
        >
            <h3
                className='PersonListItem__heading'
            >
                { person.person_name }
            </h3>
            <div className="cat-and-rmbr">
                <p
                    className="person_category"
                >
                    { person.type_of_person }
                </p>
                <div>
                    <FontAwesomeIcon icon="bolt"/> 
                    {' '}
                    { props.array.length }
                    {' '}
                    { props.array.length === 1 ? 'Rmbr' : 'Rmbrs' }
                </div>
            </div>
            <div
                className='latest_rmbr'
            >
                { secondary }
            </div>
        </li>

    );
};

export default Person;