import React, { Component } from 'react'
import RmbrMeContext from "../../contexts/RmbrMeContext";
import { Link } from "react-router-dom";
import PeopleListContext from "../../contexts/PeopleListContext";
import AddPersonForm from "../../components/AddPersonForm/AddPersonForm";

export default class AddPersonPage extends Component {

    static contextType = PeopleListContext;

    goBack = () => {
        this.props.history.push('/my-people');
    }

    handlePersonPostSuccess = person => {
        const { history } = this.props
        history.push('/my-people')
    }

    render(){
        return(
            <div>
                <header>
                    Add Person
                </header>
                <Link to={'/my-people'}><button>Back to My People</button></Link>
                <AddPersonForm
                    onPersonPostSuccess={this.handlePersonPostSuccess}
                />
            </div>
        )
    }
}