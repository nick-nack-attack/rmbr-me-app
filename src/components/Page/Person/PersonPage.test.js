import React, {Component} from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PersonPage from "./PersonPage";

const context = React.createContext({
    selected_person: {}
});

export class testContext extends Component {
    state = {
        selected_person: {
            person_name: 'Jack'
        }
    }
    render() {
        const value = {
            selected_person: this.state.selected_person
        }
        return (
            <testContext.Provider value={value}>
                { this.props.children }
            </testContext.Provider>
        );
    };
}

describe(`PersonPage component`, () => {

    it('renders PersonPage by default', () => {
        const wrapper = shallow(
            <testContext>
                <PersonPage
                    match={{
                        params: {person_id: 1},
                        isExact: true,
                        path: "",
                        url: ""
                    }}
                    context={context}
                />
            </testContext>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})