import React, { Component } from 'react'

export default class AddNote extends Component {

    goBack = () => {
        this.props.history.push('/my-people');
    }

    render(){
        return(
            <div>
                <header>
                    Add note
                </header>
                <form onSubmit={this.goBack}>
                    <p>John</p>
                    <div>
                        <input
                            type="radio"
                            id="past_event"
                            name="event_type"
                            value="past_event"
                        />
                        <label for="past_event">Past Event</label>
                        <input
                            type="radio"
                            id="current_event"
                            name="event_type"
                            value="current_event"
                        />
                        <label for="current_event">Current Event</label>
                    </div>
                    <div>
                        <label>rmbr that ... </label><br/>
                        <textarea 
                            rows={5}
                            placeholder="Had a birthday party last week ..."
                        ></textarea>
                    </div>
                    <div>
                        <label>and some extra details ...</label><br/>
                        <textarea 
                            rows={5}
                            placeholder="Had a really large cake that fell on the ground ..."
                        ></textarea>
                    </div>
                    <div>
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}