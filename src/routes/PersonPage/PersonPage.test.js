import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PersonPage from "./PersonPage";

describe(`PersonPage component`, () => {

    it('renders PersonPage by default', () => {
        const wrapper = shallow(<PersonPage/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

})