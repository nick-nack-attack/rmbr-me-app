import React, { Component } from 'react'
import RmbrContext from "../../contexts/RmbrContext";
import { Link } from "react-router-dom";
import PersonContext from "../../contexts/PersonContext";
import AddPersonForm from "../../components/AddPersonForm/AddPersonForm";

export default class AddPersonPage extends Component {

    static contextType = PersonContext;

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