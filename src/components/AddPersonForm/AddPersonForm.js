import React, { Component, useState, useContext } from 'react';
import { Input, Button } from '../Utils/Utils';
import AppApiService from "../../services/app-api-service";
import RmbrmeContext from "../../contexts/RmbrmeContext";

import './AddPersonForm.scss';

const AddPersonForm = () => {

    const [ personName, setPersonName ] = useState();
    const [ error, seterror ] = useState(null);

    let AppContext = useContext(RmbrmeContext);

    const handleSubmit = (e, prop) => {
        e.preventDefault();
        seterror(null);

        const newPerson = { 
            person_name: personName, 
            user_id: AppApiService.getUserId(), 
            type_of_person: prop
        };

        AppApiService.postPerson(newPerson)
            .then(res => {
                AppContext.addPerson(res);
                setPersonName('');
            })
            .catch(res => {
                seterror({error: res.error});
            })

    };
    

    return (
        <form className="add_person_form">
            <label>Add Person</label>
            <br/><br/>
            <Input
                name="name" 
                placeholder="Person" 
                defaultValue={personName} 
                maxlength={25}
                onChange={e => setPersonName(e.target.value)}
            />
            <label>Submit as ...</label>
            <br/><br/>
            <div className="multi-options">
                
                <Button 
                    value="Friend" 
                    disabled={!personName}
                    onClick={(e) => handleSubmit(e, e.target.value)}
                >
                    Friend
                </Button>
                <Button 
                    value="Co-Worker" 
                    disabled={!personName}
                    onClick={(e) => handleSubmit(e, e.target.value)}
                >
                    Co-worker
                </Button>
                <Button 
                    value="Family" 
                    disabled={!personName}
                    onClick={(e) => handleSubmit(e, e.target.value)}
                >
                    Family
                </Button>
            </div>
        </form>
    )

}

export default AddPersonForm;