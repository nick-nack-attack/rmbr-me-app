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

    const handleDeleteClick = e => {
        e.preventDefault();
        props.handleDeleteClick();
        setHide(!hide);
    }

    return (
        <div className="menu-container">
            <Button
                label={ hide ? <span class="material-icons">menu</span> : <span class="material-icons">close</span> }
                onClick={ e => toggleMenu(e) }
            />
            <div className={ hide ? 'hide' : 'show' }>
                <Button
                    label="edit"
                    onClick={ e => handleEditClick(e) }
                />
                <Button
                    label="delete"
                    onClick={ e => handleDeleteClick(e) }
                />
            </div>
        </div>
    )

};

export default PersonMenu;