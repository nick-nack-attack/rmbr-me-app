import React, { Component } from "react";
import RmbrmeContext from "../../contexts/RmbrmeContext";
import RmbrApiService from "../../services/rmbr-api-service";
import RmbrListItem from '../RmbrListItem/RmbrListItem';
import AddRmbrForm from '../AddRmbrForm/AddRmbrForm'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class RmbrList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rmbrList: []
        };
    };

    static contextType = RmbrmeContext;

    componentDidMount() {
        this.context.clearError();
        const person_id = this.props.person_id;
        RmbrApiService.getRmbrByPersonId(person_id)
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
            <RmbrListItem
                key={rmbr.id}
                id={rmbr.id}
                rmbr={rmbr}
                onDeleteRmbrSuccess={rmbrId => this.onDeleteRmbrSuccess(rmbrId)}
                className='rmbr_list_item'
            />
        );
    };

    render() {

        const person_id = this.props.person_id;
        const user_id = this.props.user_id;
        const numOfRmbrs = this.context.rmbrArray.length;
        const { error } = this.context;
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
                <div
                    className='add_rmbr_div'
                >
                    <AddRmbrForm
                        person_id={person_id}
                        user_id={user_id}
                        onAddRmbrSuccess={(rmbr) => this.handleAddRmbrSuccess(rmbr)}
                    />
                </div>
            </>
        );
    };
};

