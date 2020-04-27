import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class ViewProfilePage extends Component {

    goBack = () => {
        this.props.history.push('/my-people');
    }

    render() {
        return(
            <div>
                <h1>View Profile</h1>
                <Link to={'/my-people'}><button>Back to My People</button></Link>
                <div>
                    <h2>John</h2>
                    <h3>friend</h3>
                    <p>Met at <b>Sabrina's birthday party</b> about <b>2 months ago</b>.</p>
                    <div className="events_container">
                        <h4>Previous events</h4>
                        <p>• Bought a car <b>a year ago</b></p>
                        <p>• Trip to Maine <b>six months ago</b></p>
                    </div>
                    <div className="events_container">
                        <h4>Current events</h4>
                        <p>• Went to a concert <b>a day ago</b></p>
                        <p>• Trip to Florida <b>in 6 months</b></p>
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