import React, { useContext, useEffect, useState } from "react";
import RmbrmeContext from "../../contexts/RmbrmeContext";
import AppApiService from "../../services/app-api-service";
import { AppContext } from '../../contexts/AppContext';
import AddRmbr from '../AddRmbr/AddRmbr';
import Rmbr from '../Rmbr/Rmbr';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RmbrList = (props) => {

    let appContext = useContext(AppContext);
    
    const [ error, seterror ] = useState(null);
    const [ person, setPerson ] = useState(props.person);
    const [ rmbrs, serRmbrs ] = useState(props.rmbrs);
    const [ sortedRmbrs, setSortedRmbrs ] = useState([]);
    

    useEffect(() => {
        let personRmbrs = appContext.state.rmbrs.filter(r => r.id === person.id);
        setSortedRmbrs(personRmbrs);
        console.log(sortedRmbrs);
        console.log('person is', person)
    }, [person])

    
    const renderRmbrs = () => {
        return appContext.state.rmbrs.map(rmbr => {
            return (
                <Rmbr
                    key={rmbr.id}
                    id={rmbr.id}
                    rmbr={rmbr}
                />
            )
        })
    }
    

    /*
    useEffect(() => {
        AppApiService.getRmbrByPersonId()
    }, [appContext])
    */

    return (
        <ul className="rmbr__list">
            <h3></h3>
            { 
                error 
                    ? <p className='red'>There was an error, try again</p>
                    : renderRmbrs()
            }
        </ul>
    )

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