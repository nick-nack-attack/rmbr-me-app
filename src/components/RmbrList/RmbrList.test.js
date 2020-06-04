import React, { Component } from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import RmbrList from "./RmbrList";

const context = React.createContext({
    rmbrArray: []
});

export class testContext extends Component {
    state = {
        rmbrArray: ['One item']
    }
    render() {
        const value = {
            rmbrArray: this.state.rmbrArray
        }
        return (
            <testContext.Provider value={value}>
                { this.props.children }
            </testContext.Provider>
        )
    }
}

describe(`RmbrList component`, () => {

    it('renders RmbrList by default', () => {
        const wrapper = shallow(
            <testContext>
                <RmbrList context={context}/>
            </testContext>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})