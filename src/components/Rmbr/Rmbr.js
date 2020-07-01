// rmbr component
import React, { Component, useContext, useState } from "react";
import RmbrmeContext from "../../contexts/RmbrmeContext";
import RmbrApiService from "../../services/rmbr-api-service";
import EditRmbrForm from "../EditRmbrForm/EditRmbrForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from '../../assets/thunder-icon.png';
import PrettyDate from "../Utils/Utils";

// styling
import './Rmbr.scss';

const Rmbr = (props) => {

    // set context
    let context = useContext(RmbrmeContext);

    // set variables
    const [ showEditForm, setShowEditForm ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ rmbr, setRmbr ] = useState(props.rmbr);

    const handleDeleteRmbr = (e, id) => {
        e.preventDefault();
        setError(null);
        RmbrApiService.deleteRmbr(id)
            .then(() => {
                props.onDeleteRmbrSuccess(id)
            })
            .catch(res => {
                setError('Error deleting Rmbr');
            })
    };

    const hideEdit = e => {
        setShowEditForm(false);
    };

    const showEdit = e => {
        setShowEditForm(true);
    };
    
    

    return (
        <div className="rmbr-container">
            <div className='rmbr-label'>
                <label>
                    { rmbr.rmbr_title }
                </label>
                <label>
                    { rmbr.date_created }
                </label>
            </div>
            <div>
                <button className='more'>
                    <span class="material-icons">more_vert</span>
                </button>
            </div>
        </div>
    )

}

export default Rmbr;


// export default class RmbrListItem extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             onDeleteRmbrSuccess: () => {},
//             editFormDisplayed: false,
//             autofocus: false,
//             error: null,
//             onCancelEdit: () => {}
//         };
//     };

//     static contextType = RmbrmeContext;

//     handleDeleteRmbr = e => {
//         e.preventDefault()
//         const rmbr_id = this.props.id;
//         this.setState({error: null});
//         RmbrApiService.deleteRmbr(rmbr_id)
//             .then(() => {
//                 this.props.onDeleteRmbrSuccess(rmbr_id)
//             })
//             .catch(res => {
//                 this.setState({error: 'Error deleting rmbr'});
//                 })
//     };

//     onHideEditForm = e => {
//         this.setState({
//             editFormDisplayed: false,
//             autofocus: false
//         });
//     };

//     handleShowEditForm = selected => {
//         this.setState({
//             autofocus: selected,
//             editFormDisplayed: true
//         });
//     };

//     renderRmbr = () => {
//         const dateCreated = this.props.rmbr.date_created;
//         return (
//             <>
//                 <div
//                     className="Rmbr"
//                 >
//                     <div
//                         className="rmbr_header_wrapper"
//                     >
//                         <div
//                             className="rmbr_title"
//                         >
//                             <h4>
//                                 { this.props.rmbr.rmbr_title }
//                                 <span
//                                     className='edit_title_inline_button'
//                                 >
//                                     <button
//                                         onClick={() => this.handleShowEditForm(true)}
//                                     >
//                                         <FontAwesomeIcon icon='pen' />
//                                     </button>
//                                 </span>
//                             </h4>
//                             <h5
//                                 className='rmbr_added_label'
//                             >
//                                 <span><FontAwesomeIcon id='date_added_bolt' icon='bolt'/></span>
//                                 <span>
//                                 { dateCreated
//                                     ? PrettyDate(dateCreated)
//                                     : 'Rmbr'
//                                 }
//                             </span>
//                             </h5>
//                         </div>
//                     </div>
//                     <div
//                         className="rmbr_description"
//                     >
//                         <p>{ this.props.rmbr.rmbr_text }</p>
//                     </div>
//                     <div
//                         className='rmbr_add_details_button'
//                     >
//                         <button
//                             onClick={() => this.handleShowEditForm(false)}
//                         >
//                             <span>
//                                 <FontAwesomeIcon
//                                     className='inline_before_icon'
//                                     icon='plus'
//                                 />
//                                     Add Details
//                             </span>
//                         </button>
//                         <button
//                             onClick={(e) => this.handleDeleteRmbr(e)}
//                             className='rmbr_list_delete-button'
//                         >
//                             <FontAwesomeIcon icon='trash-alt' />
//                         </button>
//                     </div>
//                 </div>
//             </>
//         );
//     };

//     render() {
//         const rmbr_id = this.props.id;
//         return (
//             <li
//                 key={rmbr_id}
//                 className='Rmbr_list_item'
//             >
//                 { this.state.editFormDisplayed === true
//                     ?   <EditRmbrForm
//                             rmbr={this.props.rmbr}
//                             autofocus={ this.state.autofocus }
//                             onHideEditForm={e => this.onHideEditForm(e)}
//                         />
//                     : this.renderRmbr(rmbr_id)
//                 }
//             </li>
//         );
//     };
// };