import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './MyPeople.css'

export default class DemoPage extends Component {

    render(){

        return (

            <div>
                <header>
                    My People
                    <div>
                        <Link to={'/add-person'}>
                            <button>Add person</button>
                        </Link>
                    </div>
                </header>
                <section>
                <div className="person-cell">
                    <p><b>John</b>     <i>(friend)</i></p>
                    <p>Traveled to Europe <span>7 days ago</span></p>
                    <p>Last contacted <span>21 days ago</span></p>
                    <div className="person-cell-button-bar">
                        <Link to={'/add-note'}>
                        <button
                            onClick={this.handle}
                        >
                            Add Note
                        </button>
                        </Link>
                        <button>View Person</button>
                        <button>Delete</button>
                    </div>
                </div>
            </section>
            </div>

        )

    }

}

