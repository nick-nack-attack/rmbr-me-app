import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RmbrMeContext, { nullPerson } from '../../contexts/RmbrMeContext';
import PeopleApiService from "../../services/person-api-service";
import { NiceDate, Hyph, Section } from "../../components/Utils/Utils";
import PersonRmbr from "../../components/PersonRmbr/PersonRmbr";


export default class PersonPage extends Component {

    static contextType = RmbrMeContext;

    goBack = () => {
        this.props.history.push('/my-people');
    }

    componentDidMount() {
        // this.context.clearError()
        console.log('componentDidMount ran...')
        const currentPersonId = this.props.match.params.personId;
        console.log('currentPersonId: ', currentPersonId)
        PeopleApiService.getPerson(currentPersonId)
            .then(this.context.setPerson)
            .catch(this.context.setError)
    }

    renderRmbrs() {
    const testRmbrs = [
        {
            id: 1,
            rmbr_title: 'Went Shopping',
            rmbr_text: 'Got apples',
            category: 'Friend',
            date_created: '2020-04-19 02:24:27.001697',
            date_modified: '2020-04-19 02:24:27.001697'
        },
        {
            id: 2,
            rmbr_title: 'Mowed the lawn',
            rmbr_text: 'went great',
            category: 'Co-Worker',
            date_created: '2020-04-19 02:24:27.001697',
            date_modified: '2020-04-19 02:24:27.001697'
        }
    ]
        return testRmbrs.map(rbr =>
            <li key={rbr.id}>
            <PersonRmbr
                id={rbr.id}
                rmbr_title={rbr.rmbr_title}
                rmbr_text={rbr.rmbr_text}
                category={rbr.category}
                date_created={rbr.date_created}
                date_modified={rbr.date_modified}
            />
            </li>
        )
    };

    render() {

        console.log('person page rendered')

        const { error } = this.context;

        return (
            <div>
                <h1>View Profile</h1>
                <Link to={'/my-people'}><button>Back to My People</button></Link>
                <div>
                    <h2>John</h2>
                    <h3>friend</h3>
                    <div>
                        <ul>
                            { error
                                ? <p className='red'>There was an error, try again</p>
                                : this.renderRmbrs()
                            }
                        </ul>
                    </div>
                    <div>
                    <Link to={'/add-note'}>
                        <button
                            onClick={this.handle}
                        >
                            Add Note
                        </button>
                        </Link>
                        <div>
                            <Link to={'/my-people'}><button>Back to My People</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}