import React, { useState, useEffect, useContext } from 'react';
import { Button, Input } from '../../Utils/Utils';
import AppApiService from '../../../services/app-api-service';
import { AppContext } from '../../../contexts/AppContext';

const AddPerson = () => {

    const [ personName, setPersonName ] = useState('');
    const [ error, seterror ] = useState(null);

    let appContext = useContext(AppContext);

    const handleSubmit = (e, prop) => {
        e.preventDefault();
        const newPerson = {
            person_name: personName,
            user_id: AppApiService.getUserId(),
            type_of_person: prop === 'Co-Worker' ? 'Co-Worker' : prop === 'Friend' ? 'Friend' : 'Family' 
        };
        AppApiService.postPerson(newPerson)
            .then(() => {
                setPersonName('');
                appContext.dispatch({
                    type: 'refetch'
                })
            })
            .catch(res => {
                seterror(res);
            })
    };

    const makeButtonRow = () => {
        return (
            <div className="button-row">
                <Button
                    label="Friend"
                    value="Friend"
                    disabled={!personName}
                    onClick={(e) => handleSubmit(e, 'Friend')}
                />
                <Button
                    label="Co-Worker"
                    value="Co-Worker"
                    disabled={!personName}
                    onClick={(e) => handleSubmit(e, 'Co-Worker')}
                />
                <Button
                    label="Family"
                    value="Family"
                    disabled={!personName}
                    onClick={(e) => handleSubmit(e, 'Family')}
                />
            </div>
        );
    };

    return (
        <form>    
            <legend>Add Person</legend>
            <Input
                name="name"
                placeholder="Person"
                defaultValue={personName}
                maxlength={25}
                onChange={e => setPersonName(e.target.value)}
            />
            <label>
                { personName && 'Add person as ...' }
            </label>
                { personName && makeButtonRow() }
        </form>
    );

};

export default AddPerson;