import React, { Component } from 'react'
import { Link } from "react-router-dom";
import AddPersonForm from "../../components/AddPersonForm/AddPersonForm";
import RmbrmeContext from "../../contexts/RmbrmeContext";

export default class AddPersonPage extends Component {

    static contextType = RmbrmeContext;

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