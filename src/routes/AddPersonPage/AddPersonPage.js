import React, { Component } from 'react'

export default class AddPerson extends Component {

    goBack = () => {
        this.props.history.push('/my-people');
    }

    render(){
        return(
            <div>
                <header>
                    Add Person
                </header>
                <form onSubmit={this.goBack}>
                    <div>
                        <label>Name </label>
                        <input/>
                    </div>
                    <div>
                        <label>Category </label>
                        <select>
                            <option>Select one..</option>
                            <option>Friend</option>
                            <option>Co-Worker</option>
                            <option>Family</option>
                        </select>
                    </div>
                    <div>
                        <label>How did you meet?</label><br/>
                        <textarea 
                            placeholder="Skydiving yacht party" 
                            rows={5}>
                        </textarea>
                    </div>
                    <div>
                    </div>
                    <div>
                        <label>Past things going on</label><br/>
                        <textarea 
                            placeholder="Got certified as a Underwater Basket Weaver last week" 
                            rows={5}>    
                        </textarea>
                    </div>
                    <div>
                        <label>What's going on now?</label><br/>
                        <textarea 
                            placeholder="Going to medical school. Or clown school. I can't remember which one ..." 
                            rows={5}>
                        </textarea>
                    </div>
                    <div>
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}