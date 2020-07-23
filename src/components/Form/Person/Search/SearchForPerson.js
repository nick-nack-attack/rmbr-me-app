import React, { useState, useEffect } from 'react';
import { Input, Button } from '../../../Utils/Utils';

import '../../Form.scss';

const SearchForPerson = props => {

    const [ searchName, setSearchName ] = useState('');

    const handleSearchNameChange = string  => {
        setSearchName(string)
        props.searchName(string)
    }

    return (
        <form>
            <legend>Search</legend>
            <Input 
                placeholder="Search"
                value={searchName}
                onChange={e => handleSearchNameChange(e.target.value)}
            />      
        </form>
    );

};

export default SearchForPerson;