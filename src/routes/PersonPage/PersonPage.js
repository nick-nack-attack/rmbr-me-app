import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RmbrMeContext, { nullPerson } from '../../contexts/RmbrMeContext';
import PeopleApiService from "../../services/person-api-service";
import PersonRmbrList from '../../components/PersonRmbrList/PersonRmbrList'
import { NiceDate, Hyph, Section } from "../../components/Utils/Utils";
import PersonRmbr from "../../components/PersonRmbr/PersonRmbr";


export default class PersonPage extends Component {

    static contextType = RmbrMeContext;

    goBack = () => {
        this.props.history.push('/my-people');
    }

    componentDidMount() {
        // this.context.clearError()
       const currentPersonId = this.props.match.params.personId;

       this.context.setPersonId(currentPersonId);
        /* PeopleApiService.getPerson(currentPersonId)
            .then(this.context.setPerson)
            .catch(this.context.setError) */
        PeopleApiService.getOnePerson(currentPersonId)
            .then(this.context.setPerson)
            .catch(this.context.setError)

        PeopleApiService.getPersonRmbrs(currentPersonId)
            .then(this.context.setRmbrsList)
            .catch(this.context.setError)
        
            // PeopleApiService.Notes()
            // .then(this.context.setNote)
            // .catch(this.context.setError)
            // api.getlist()
            // .then(this.context.setList)
            // .catch(this.context.setError)
            // api.getCards()
            // .then(this.context.setCard)
            // .catch(this.context.setError)

            //const currentPersonName = this.context.person.find(p => p.id !== currentPersonId)
            //console.log(currentPersonName)

    }

    render() {

        const currentPersonId = 1 //this.props.match.params.personId;
        const userId = 1 //this.context.userId;
        const currentPersonName = 'jack' // this.context.person.person_name;
        const currentPersonCategory = 'thomas' //this.context.person.type_of_person;

        console.log('person page rendered with', currentPersonName, currentPersonCategory)

        const { error } = this.context;

        return (
            <div>
                <div>
                    <h2>{ currentPersonName }</h2>
                    <h3>{currentPersonCategory}</h3>
                    <div>
                    <PersonRmbrList
                    listOfRmbrs={this.context.rmbrsList}
                    personId={currentPersonId}
                    userId={userId}
                    />
                    </div>
                    <div>
                        <div>
                            <Link to={'/my-people'}><button>Back to My People</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}