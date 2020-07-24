// rmbr component
import React, { useContext, useState } from "react";

// components
import EditRmbrForm from "../../Form/Rmbr/Edit/EditRmbrForm"

// context / hook / service
import {AppContext} from "../../../contexts/AppContext";
import AppApiService from "../../../services/app-api-service";

// utils
import PrettyDate from "../../Utils/helpers";

// styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './RmbrItem.scss';

const RmbrItem = props => {

    // set context
    let context = useContext(AppContext);

    // set variables
    const [ showEditForm, setShowEditForm ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ rmbr, setRmbr ] = useState(props.rmbr);

    const handleDeleteRmbr = (e, id) => {
        e.preventDefault();
        setError(null);
        AppApiService.deleteRmbr(id)
            .then(() => {
                context.dispatch({
                    type: 'refetch'
                })
                props.onDeleteRmbrSuccess(id)
            })
            .catch(res => {
                setError('Error deleting Rmbr');
            })
    };

    const replaceEditedRmbr = rbr => {
        setShowEditForm(false);
        setRmbr({...rmbr, rmbr_title: rbr.rmbr_title})
    };

    const hideEdit = () => {
        setShowEditForm(false);
    };

    const showEdit = e => {
        setShowEditForm(true);
    };

    return (
        <li className="rmbr-container">
        { showEditForm 
            ?   <EditRmbrForm
                    rmbr={ rmbr }
                    onHideEditForm={ () => hideEdit() }
                    onEditRmbrSuccess={ rbr => replaceEditedRmbr(rbr) }
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
        </li>
    );

}

export default RmbrItem;