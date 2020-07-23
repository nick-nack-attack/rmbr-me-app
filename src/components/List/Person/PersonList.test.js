import React, { Component } from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PersonList from "./PersonList";

const context = React.createContext({
    personArray: []
});

export class testContext extends Component {
    state = {
        personArray: ['One item', 'Two items']
    }
    render() {
        const value = {
            personArray: this.state.personArray
        }
        return (
            <testContext.Provider value={value}>
                { this.props.children }
            </testContext.Provider>
        )
    }
}

describe(`Person list component`, () => {

    it('renders Person list by default', () => {
        const wrapper = shallow(
            <testContext>
                <PersonList context={context}/>
            </testContext>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})