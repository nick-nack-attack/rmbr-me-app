import React, { useContext, useState } from 'react';
import { Button } from '../../Utils/Utils';

// style 
import "../Menu.scss";

const PersonMenu = props => {

    const [ hide, setHide ] = useState(true);
    
    const toggleMenu = e => {
        e.preventDefault();
        setHide(!hide);
    };

    const handleEditClick = e => {
        e.preventDefault();
        props.handleEditClick();
        setHide(!hide);
    };

    return (
        <div className="menu-container">
            <Button
                label={ <span class="material-icons">menu</span> }
                onClick={ e => toggleMenu(e) }
            />
            <div className={ hide ? 'hide' : 'show' }>
                <Button
                    label="edit"
                    onClick={ e => handleEditClick(e) }
                />
                <Button
                    label="delete"
                    onClick={ e => props.handleDeleteClick(e) }
                />
            </div>
        </div>
    )

};

export default PersonMenu;