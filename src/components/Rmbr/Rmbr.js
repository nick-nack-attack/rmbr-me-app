// rmbr component
import React, { Component, useContext, useState } from "react";
import RmbrmeContext from "../../contexts/RmbrmeContext";
import AppApiService from "../../services/app-api-service";
import EditRmbrForm from "../EditRmbrForm/EditRmbrForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from '../../assets/thunder-icon.png';
import PrettyDate, { Input } from "../Utils/Utils";

// styling
import './Rmbr.scss';

const Rmbr = (props) => {

    // set context
    let context = useContext(AppApiService);

    // set variables
    const [ showEditForm, setShowEditForm ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ rmbr, setRmbr ] = useState(props.rmbr);

    const handleDeleteRmbr = (e, id) => {
        e.preventDefault();
        setError(null);
        AppApiService.deleteRmbr(id)
            .then(() => {
                props.onDeleteRmbrSuccess(id)
            })
            .catch(res => {
                setError('Error deleting Rmbr');
            })
    };

    const hideEdit = () => {
        setShowEditForm(false);
    };

    const showEdit = e => {
        setShowEditForm(true);
    };

    return (
        <div className="rmbr-container">
        { showEditForm 
            ?   <EditRmbrForm
                    rmbr={rmbr}
                    onHideEditForm={() => hideEdit()}
                />  
            : <>
                <div className='rmbr-label'>
                <label>
                    { rmbr.rmbr_title }
                </label>
            </div>
                <div className="more-options">
            <label className="date-label">
                    { rmbr.date_created ? PrettyDate(rmbr.date_created) : '' }
                </label>
                <button onClick={() => showEdit()}>
                    <span class="material-icons">create</span>
                </button>
                <button onClick={e => handleDeleteRmbr(e, rmbr.id)}>
                    <span class="material-icons">delete</span>
                </button>
            </div>
            </>
        }
        </div>
    );

}

export default Rmbr;