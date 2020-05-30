import React, { Component } from "react";
import RmbrmeContext from "../../contexts/RmbrmeContext";
import RmbrApiService from "../../services/rmbr-api-service";
import RmbrListItem from '../RmbrListItem/RmbrListItem';
import AddRmbrForm from '../AddRmbrForm/AddRmbrForm'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './RmbrList.css'

export default class RmbrList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rmbrList: []
        }
    }

    static contextType = RmbrmeContext;

    componentDidMount() {
        this.context.clearError()
        const person_id = this.props.person_id;
        RmbrApiService.getRmbrByPersonId(person_id)
            .then( res => this.context.setRmbrArray(res))
            .catch(err => console.log(err))


    };

    onDeleteRmbrSuccess = rmbrId => {
        console.log('onDeleteRmbrSuccess ran!', rmbrId)
    }

    renderRmbrs = () => {
        const rmbrArray = this.context.rmbrArray;
        return rmbrArray.map(rmbr =>
            <RmbrListItem
                key={rmbr.id}
                rmbr={rmbr}
                onDeleteRmbrSuccess={rmbrId => this.onDeleteRmbrSuccess(rmbrId)}
                className='rmbr_list_item'
            />
        )
    };

    render() {
        const person_id = this.props.person_id;
        const user_id = this.props.user_id;
        const numOfRmbrs = this.context.rmbrArray.length
        const { error } = this.context;
        return (
            <>
                <ul className='rmbr__list'>
                    <h3>
                        <span>
                            {numOfRmbrs === 0
                                ? 'No Rmbrs yet! '
                                : numOfRmbrs === 1
                                    ? numOfRmbrs + ' Rmbr '
                                    : numOfRmbrs + ' Rmbrs '}
                        </span>
                        <span><FontAwesomeIcon icon='bolt'/></span>
                    </h3>
                    { error
                        ? <p className='red'>There was an error, try again</p>
                        : this.renderRmbrs()
                    }
                </ul>
                <AddRmbrForm
                    person_id={person_id}
                    user_id={user_id}
                />
            </>

        )
    }
};

