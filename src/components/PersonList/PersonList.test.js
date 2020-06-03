import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PersonList from "./PersonList";

describe(`PersonList component`, () => {

    it('renders PersonList by default', () => {
        const wrapper = shallow(<PersonList/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})