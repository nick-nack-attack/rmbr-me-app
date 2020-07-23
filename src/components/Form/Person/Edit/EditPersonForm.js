import React, { Component, useState, useEffect, useContext } from 'react';
import AppApiService from "../../../../services/app-api-service";
import RmbrmeContext from "../../../../contexts/RmbrmeContext";

import { Input, Section, Button } from "../../../Utils/Utils";
import { AppContext } from '../../../../contexts/AppContext';

const EditPersonForm = props => {

    const [ person, setPerson ] = useState({ person_name: '', type_of_person: '' });
    const [ initPerson, setInitPerson ] = useState(props.person);
    const [ error, setError ] = useState(null);

    const context = useContext(AppContext)

    useEffect(() => {
        setPerson({
            person_name: initPerson.person_name, 
            type_of_person: initPerson.type_of_person
        })
    }, [ initPerson ]);

    const handleCancelClick = e => {
        e.preventDefault();
        props.handleCancelClick();
    };

    const handleChange = e => {
        setPerson({
            type_of_person: e.target.value
        })
    };

    const renderOptions = () => {
        const categories = ['Family', 'Friend', 'Co-Worker'];
        return (
            <select
                onChange={ e => handleChange(e)}
            >
                <option
                    value='Family'
                    selected={ person.type_of_person === 'Family' }
                >
                    Family
                </option>
                <option
                    value='Friend'
                    selected={ person.type_of_person === 'Friend' }
                >
                    Friend
                </option>
                <option
                    value='Co-Worker'
                    selected={ person.type_of_person === 'Co-Worker' }
                >
                    Co-Worker
                </option>
            </select>
        )
    };

    const handleCloseForm = res => {
        props.handleCloseForm(res);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setError(null);

        const personName = person.person_name || props.person.person_name;
        const typeOfPerson = person.type_of_person || props.person.type_of_person;

        const personToSubmit = {
            person_name: personName,
            user_id: initPerson.user_id,
            type_of_person: typeOfPerson
        };

        AppApiService.editPerson(initPerson.id, personToSubmit)
            .then( res => {
                context.dispatch({
                    type: 'refetch'
                })
                handleCloseForm(res);      
            })
            .catch( res => {
                setError(error || res.error)
            })
    };

    return (
        <Section>
            <form>
                <legend>Edit Person</legend>
                <Input
                    name="person_name"
                    defaultValue={ props.person.person_name }
                    value={person.person_name}
                    onChange ={ e => setPerson({
                        person_name: e.target.value,
                        type_of_person: person.type_of_person || props.person.person_name
                    })}
                />
                 { renderOptions() } 
                <Button
                    label="Save"
                    onClick={ e => handleSubmit(e) } 
                />
                <Button
                    label="Cancel"
                    onClick={ e => handleCancelClick(e) }
                />
            </form>
        </Section>
    );

};

export default EditPersonForm;