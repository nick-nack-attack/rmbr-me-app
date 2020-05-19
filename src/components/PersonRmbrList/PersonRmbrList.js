import React, { Component } from "react";
import PeopleListContext from "../../contexts/PeopleListContext";
import PeopleApiService from "../../services/person-api-service";
import PersonRmbr from '../PersonRmbr/PersonRmbr';
import AddRmbrForm from '../AddRmbrForm/AddRmbrForm'
import { NiceDate } from "../Utils/Utils";
import { Button, Textarea } from "../Utils/Utils";
// import './PersonRmbr.css'

export default class PersonRmbrList extends Component {

    static contextType = PeopleListContext;

    componentDidMount() {  
        this.context.clearError()
        console.log('componentDidMount in PersonRmbrList ran!')
        console.log('rmbrs are here:', this.context.rmbrsList)
    };

    renderRmbrsForList() {
        return this.props.listOfRmbrs.map(rmbr =>
            <PersonRmbr
                category={rmbr.category}
                id={rmbr.id}
                person_id={rmbr.person_id}
                rmbr_title={rmbr.rmbr_title}
                rmbr_text={rmbr.rmbr_text}
            />
            )
    };

    render() {

        const personId = this.props.personId;
        const userId = this.props.userId;

        const { error } = this.context;

        return (
            <>
                <ul className='rmbr__list'>
                    <h3>Rmbrs</h3>
                    { error
                        ? <p className='red'>There was an error, try again</p>
                        : this.renderRmbrsForList()
                    }
                </ul>
                <AddRmbrForm
                    personId={personId}
                    userId={userId}
                />
            </>

        )
    }
};

