import React, { useContext, useState, useEffect } from 'react';
import { Input, Button } from '../Utils/Utils';
import RmbrApiService from "../../services/rmbr-api-service";
import RmbrmeContext from "../../contexts/RmbrmeContext";
import icon from '../../assets/thunder-icon.png';

import './AddRmbr.scss';

const AddRmbr = (props) => {

    // set variables
    const [ activated, setActivated ] = useState(false);
    const [ title, setTitle ] = useState('');
    const [ charactersLeft, setCharactersLeft ] = useState(32);
    const [ error, setError ] = useState(null);
    const characterLimit = 50;

    // set context
    let context = useContext(RmbrmeContext);

    useEffect(() => {
        setCharactersLeft(characterLimit - title.length)
    }, [title]);

    const handleChange = event => {
        setTitle(event.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setActivated(false);
        setError(null);
        const newRmbr = {
            rmbr_title: title,
            rmbr_text: '',
            person_id: props.person_id,
            user_id: window.localStorage.getItem('user_id')
        };
        RmbrApiService.postRmbr(newRmbr)
            .then(res => {
                context.addRmbr(res);
                setTitle('');
                props.onAddRmbrSuccess(res);
            })
            .catch(res => {
                setError(res);
            });
    };

    return (
        <>
        <div className={`add-rmbr-container ${activated ? 'active' : 'inactive'}`}>
            <div class="add-title-label">
                <img className="thunder-icon" src={icon} alt="thunder icon"/>
                <input
                    name='rmbrTitle'
                    id='rmbrTitle'
                    placeholder='rmbr this...'
                    value={title}
                    autoComplete={false}
                    onChange={handleChange}
                    onSelect={() => setActivated(true)}
                    type="text"
                    // onBlur={() => setActivated(false)}
                    maxlength={characterLimit}
                    class={`add-rmbr-input ${activated ? 'active-rmbr-input' : 'hide-rmbr-input'}`}
                />
            </div>
            <div className={`${activated ? 'show-end' : 'hide-end'}`}>
                <p>{ charactersLeft }</p>
                <button
                    className={`submit-rmbr`}
                    onClick={e => handleSubmit(e)}
                >
                    <span class="material-icons">check</span>
                </button>
            </div>
        </div>
        <button
            className={activated ? 'show' : 'hide'}
            onClick={() => setActivated(false)}
        >
            X
        </button>
        </>
    )

}

export default AddRmbr;

// export default class AddRmbrForm extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             rmbrTitle: '',
//             error: null,
//             onAddRmbrSuccess: () => {}
//         };
//     };

//     static contextType = RmbrmeContext;

//     handleTitleChange = changeEvent => {
//         this.setState({
//             rmbrTitle: changeEvent.target.value
//         });
//     };


//     handleSubmitRmbr = e => {
//         e.preventDefault()
//         this.setState({error: null});
//         const rmbr_title = this.state.rmbrTitle;
//         const rmbr_text = '';
//         const person_id = this.props.person_id;
//         const user_id = window.localStorage.getItem('user_id');
//         const newRmbr = { rmbr_title, rmbr_text, person_id, user_id };
//         RmbrApiService.postRmbr(newRmbr)
//             .then(res => {
//                 this.context.addRmbr(res);
//                 this.setState({
//                     rmbrTitle: ''
//                 });
//                 this.props.onAddRmbrSuccess(res);
//             })
//             .catch(res => {
//                 this.setState({
//                     error: res
//                 });
//             })
//         };

//     render() {
//         return (
//             <form
//                 className='add_rmbr_form'
//                 onSubmit={(e) => this.handleSubmitRmbr(e)}
//             >
//                 <legend>Add Rmbr</legend>
//                 <div>
//                    <Input
//                         name='rmbrTitle'
//                         id='rmbrTitle'
//                         placeholder='Add a new rmbr here'
//                         value={this.state.rmbrTitle}
//                         onChange={this.handleTitleChange}
//                     />
//                     <Button
//                         disabled={!this.state.rmbrTitle}
//                     >
//                         Submit
//                     </Button>
//                 </div>
//             </form>
//         );
//     };
// };