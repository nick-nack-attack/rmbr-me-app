import React, { Component } from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PersonListItem from "./PersonListItem";

const context = React.createContext({
    rmbrArray: []
});

export class testContext extends Component {
    state = {
        rmbrArray: ['One item', 'Two items']
    }
    render() {
        const value = {
            rmbrArray: this.state.rmbrArray
        }
        return (
            <testContext.Provider value={value}>
                { this.props.children }
            </testContext.Provider>
        );
    };
};

describe(`PersonListItem component`, () => {

    it('renders PersonListItem by default', () => {
        const wrapper = shallow(
        <testContext>
            <PersonListItem context={context}/>
        </testContext>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})