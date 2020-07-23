// component displays every rmbr a person has
import React, { useContext, useEffect, useState } from "react";

// context
import { AppContext } from '../../../contexts/AppContext';

// service
import AppApiService from "../../../services/app-api-service";

// component
import AddRmbr from '../../Form/Rmbr/Add/AddRmbr';
import RmbrItem from '../../Item/Rmbr/RmbrItem';

const RmbrList = props => {

    let appContext = useContext(AppContext);
    
    const [ error, seterror ] = useState(null);
    const [ notification, setNotification ] = useState(null);
    const [ id, setId ] = useState(props.id);
    const [ person, setPerson ] = useState(props.person);
    const [ rmbrs, setRmbrs ] = useState(props.rmbrs);

    useEffect(() => {
        setRmbrs(props.rmbrs);
    }, [ props.rmbrs ]);

    const handleDeleteRmbr = () => {
        setNotification('Rmbr has been deleted')
        setTimeout(() => {
            setNotification(null)
        }, 6000);
    };

    const handleAddRmbr = () => {
        setNotification('Rmbr has been Added')
        setTimeout(() => {
            setNotification(null)
        }, 6000);
    };

    const renderRmbrs = () => {
        
        return rmbrs.sort((a,b) => a.id - b.id).map(rmbr => {
            return (
                <RmbrItem
                    key={rmbr.id}
                    id={rmbr.id}
                    rmbr={rmbr}
                    onDeleteRmbrSuccess={() => handleDeleteRmbr()}
                />
            );
        });
    };

    return (
        <div>
            { notification }
            <ul className="rmbr__list">
                { 
                    error 
                        ? <p className='red'>There was an error, try again</p>
                        : renderRmbrs()
                }
            </ul>
            <AddRmbr 
                person_id={ id }
                onAddRmbrSuccess={ e => handleAddRmbr(e) } 
            />
        </div>
    );

};

export default RmbrList;

/*

export default class RmbrList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rmbrList: []
        };
    };

    static contextType = AppApiService;

    componentDidMount() {
        //this.context.clearError();
        const person_id = this.props.person_id;
        AppApiService.getRmbrByPersonId(person_id)
            .then( res => {
                this.context.setRmbrArray(res);
            })
            .catch(err => console.log(err))
    };

    onDeleteRmbrSuccess = (rmbr_id) => {
        this.context.deleteRmbr(rmbr_id)
    };

    handleAddRmbrSuccess = (rmbr) => {
        this.context.addRmbrToArray(rmbr)
    };

    renderRmbrs = () => {
        const rmbrArray = this.context.rmbrArray;
        return rmbrArray.sort((a,b) => a.id - b.id).map(rmbr =>
            <Rmbr
                key={rmbr.id}
                id={rmbr.id}
                rmbr={rmbr}
                onDeleteRmbrSuccess={ id => this.onDeleteRmbrSuccess(id) }
            />
        );
    };

    render() {

        const person_id = this.props.person_id;
        const user_id = this.props.user_id;
        const numOfRmbrs = 0//this.context.rmbrArray.length;
        
        const rmbrOrRmbrsLabel = <span>{numOfRmbrs === 0 ? 'No Rmbrs yet! ' : numOfRmbrs === 1 ? numOfRmbrs + ' Rmbr ' : numOfRmbrs + ' Rmbrs '}</span>;

        return (
            <>
                <ul
                    className='rmbr__list'
                >
                    <h3
                        className='rmbr_list_num-label'
                    >
                        <span>
                            { rmbrOrRmbrsLabel }
                        </span>
                        <span><FontAwesomeIcon icon='bolt'/></span>
                    </h3>
                    { error
                        ? <p className='red'>There was an error, try again</p>
                        : this.renderRmbrs()
                    }
                </ul>
                <div className="add-rmbr-div">
                    <AddRmbr
                        person_id={person_id}
                        onAddRmbrSuccess={(rmbr) => this.handleAddRmbrSuccess(rmbr)}
                    />
                </div>
            </>
        );
    };
};

*/